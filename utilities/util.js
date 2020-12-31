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

    let currL = allRecipes.length;
    let randIdx = generateRandomInteger(0, currL-1);
    let featuredRecipe = allRecipes[randIdx];

    return featuredRecipe;
}

export function toHourRound(hr, min) {
    // returns a number, rounded hours
    min > 30 ? hr++ : hr;
    return hr;
}

export function durationFix(hr, min) {
    return `${hr}h ${min ? `${min}m` : ''}`
}