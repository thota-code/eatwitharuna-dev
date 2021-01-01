// import { useRouter } from 'next/router';
import s from "styles/recipe.module.scss";


import { numToWord } from 'utilities/util';

import Navbar from 'components/Navbar/Navbar';
import SingleRecipe from 'components/SingleRecipeCard/SingleRecipeCard';

import { getAllRecipes, getSingleRecipe } from 'sanityio/api';


export async function getStaticPaths() {
    const recipes = await getAllRecipes();

    const paths = recipes.map(recipe => ({
        params: { recipe: recipe.slug.current }
    }));

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const currentRecipe = await getSingleRecipe(params.recipe);

    return {
        props: {
            currentRecipe
        }
    }
}

const Recipe = ({ currentRecipe }) => {
    const instructionSerialize = () => {
        const recInst = currentRecipe[0].recipeInstructions;
        const inst = recInst.map(instObj => {
            return instObj.children[0].text;
        });

        return (
            <div className={s["recipeInstructions"]}>
                {inst.map((inst, idx) => {
                    return (
                        <div key={idx} className={s["recipeInstructions__step"]}>
                            <span className={s["recipeInstructions__step--number"]}>{numToWord(idx + 1)}</span>
                            <span className={s["recipeInstructions__step--text"]}>{inst}</span>
                        </div>
                    )
                })}
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <SingleRecipe cR={currentRecipe[0]} />
            {instructionSerialize()}
        </>
    )
}

export default Recipe;