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
    const allRecipes = await getAllFeaturableRecipes()
        // .then(data => console.log(data));

    console.log('--util--')
    console.log(allRecipes);
    let currL = allRecipes.length;
    let randIdx = generateRandomInteger(0, currL-1);
    console.log('randIdx: ', randIdx);
    let featuredRecipe = allRecipes[randIdx];
    console.log('featuredRecipe w/o var', allRecipes[randIdx]);
    // console.log(featuredRecipe);

    return featuredRecipe;
}