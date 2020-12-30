export function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function fetcher(url) {
    fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
}

// featured recipe util
import { getAllFeaturableRecipes } from 'sanityio/api';

export async function featuredRecipeUtil() {
    const allRecipes = await getAllFeaturableRecipes();

    let currL = allRecipes.length;
    let randIdx = generateRandomInteger(0, currL);
    let featuredRecipe = allRecipes[randIdx];

    return featuredRecipe;
}