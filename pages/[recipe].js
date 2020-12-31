// import { useRouter } from 'next/router';

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
    console.log(currentRecipe[0]);
    return (
        <>
            <Navbar />
            <SingleRecipe cR={currentRecipe[0]} />
        </>
    )
}

export default Recipe;