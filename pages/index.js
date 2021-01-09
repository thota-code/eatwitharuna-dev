import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from 'components/Navbar/Navbar';
import FeaturedRecipe from 'components/FeaturedRecipe/FeaturedRecipe';
import Footer from 'components/Footer/Footer';
import SingleRecipe from 'components/SingleRecipeCard/SingleRecipeCard';
import RecipesGrid from 'components/RecipesGrid/RecipesGrid';
import IndexBlogs from 'components/IndexBlogs/IndexBlogs';

import s from 'styles/index.module.scss';

// import { featuredRecipeUtil } from 'utilities/util';
import { getAllFeaturableRecipes } from 'sanityio/api';

export async function getStaticProps(ctx) {
//   let featuredRecipe = await featuredRecipeUtil();
	let featRecipes = await getAllFeaturableRecipes();
  
  return {
    props: {
		featRecipes,
    },
    // revalidate: 40,
  }
}


export default function Home({ featRecipes }) {
//   const recipeHref = '/recipe/' + featuredRecipe.slug.current;

  return (
		<div className={s["index"]}>
			<Head>
				<title>Eat with Aruna</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<div className={s["index__Mcorner"]}>
				<Image
					src="/MCorner.svg"
					className={s["index__Mcorner-img"]}
					height={200}
					width={200}
				/>
			</div>

			<Navbar className={s["index__nav"]} />

			<div className={s["index__dotted-1"]}>
				<Image
					src="/DottedLine.svg"
					className={s["index__dotted-1-img"]}
					height={200}
					width={800}
				/>
			</div>

			<main className={s["index__main"]}>
				<div className={s["index__main-featured"]}>
					{/* <Link href={recipeHref} passHref> */}
					<FeaturedRecipe recipes={featRecipes} />
					{/* </Link> */}
				</div>

				<div className={s["index__main-grid"]}>
					<RecipesGrid numRecipes={8} recipes={featRecipes} moreRec={true} />
				</div>

				<div className={s["index__main-blog"]}>
					<IndexBlogs />
				</div>
			</main>

			<footer className={s["index__footer"]}>
				<Footer />
			</footer>
		</div>
	);
}
