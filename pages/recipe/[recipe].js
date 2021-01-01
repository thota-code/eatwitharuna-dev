// import { useRouter } from 'next/router';
import toMarkdown from '@sanity/block-content-to-markdown';
import s from "styles/recipe.module.scss";

import Navbar from 'components/Navbar/Navbar';
import SingleRecipe from 'components/SingleRecipe/SingleRecipe';

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
        const instructions = currentRecipe[0].recipeInstructions;

        const serializers = {
            types: {
                code: (props) =>
                    "```" + props.node.language + "\n" + props.node.code + "\n```",
            },
        };

        const text = toMarkdown(instructions, {serializers});

        return (
            <>  
                <div className={s["recipeInstructions"]}>
                    {text}
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <SingleRecipe cR={currentRecipe[0]} />
            {instructionSerialize()}
        </>
    )
}

export default Recipe;