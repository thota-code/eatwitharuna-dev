import Head from "next/head";
import Image from "next/image";

import s from "styles/recipe.module.scss";

import { numToWord } from "utilities/util";

import Navbar from "components/Navbar/Navbar";
import SingleRecipeCard from "components/SingleRecipeCard/SingleRecipeCard";
import Footer from "components/Footer/Footer";
import RecipesGrid from "components/RecipesGrid/RecipesGrid";

import { getAllRecipes, getSingleRecipe } from "sanityio/api";

export async function getStaticPaths() {
	const recipes = await getAllRecipes();

	const paths = recipes.map((recipe) => ({
		params: { recipe: recipe.slug.current },
	}));

	return {
			paths,
			fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const currentRecipe = await getSingleRecipe(params.recipe);

	return {
		props: {
			currentRecipe,
		},
		revalidate: 10
	};
}

const Recipe = ({ currentRecipe }) => {
	const instructionSerialize = () => {
		const recInst = currentRecipe[0].recipeInstructions;
		const inst = recInst.map((instObj) => {
			return instObj.children[0].text;
		});

		return (
			<div className={s["recipeInstructions"]}>
				{inst.map((inst, idx) => {
					return (
						<div key={idx} className={s["recipeInstructions__step"]}>
							<span className={s["recipeInstructions__step--number"]}>
								{numToWord(idx + 1)}
							</span>
							<span className={s["recipeInstructions__step--text"]}>
								{inst}
							</span>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<>
			<Head>
				<title>{currentRecipe[0].title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<div className={s["recipe__Mcorner"]}>
				<Image
					src="/MCorner.svg"
					className={s["recipe__Mcorner-img"]}
					height={200}
					width={200}
				/>
			</div>

			<div className={s["recipe"]}>
				<Navbar className={s["recipe__nav"]} />

				<main className={s["recipe__main"]}>
					<SingleRecipeCard
						className={s["recipe__main--card"]}
						cR={currentRecipe[0]}
					/>
					{instructionSerialize()}

					<div className={s["recipe__main--more"]}>
						<span className={s["recipe__main--more-text"]}>
							more {currentRecipe[0].recipeCategory}s
						</span>
						<RecipesGrid
							numRecipes={5}
							moreRec={true}
							recipes={currentRecipe}
						/>
					</div>
				</main>

				<footer className={s["recipe__footer"]}>
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default Recipe;
