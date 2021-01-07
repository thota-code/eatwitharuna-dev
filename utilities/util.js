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

// export async function featuredRecipeUtil() {
//     const allRecipes = await getAllFeaturableRecipes()

    // let currL = allRecipes.length;
    // let randIdx = generateRandomInteger(0, currL-1);
    // let featuredRecipe = allRecipes[randIdx];

//     return featuredRecipe;
// }

export function toHourRound(hr, min) {
    // returns a number, rounded hours
    min > 30 ? hr++ : hr;
    return hr;
}

export function durationFix(hr, min) {
    return `${hr}h ${min ? `${min}m` : ''}`
}

export function numToWord(num) {
    let word;

    switch (num) {
        case 1: word = 'one'; break;
        case 2: word = 'two'; break;
        case 3: word = 'three'; break;
        case 4: word = 'four'; break;
        case 5: word = 'five'; break;
        case 6: word = 'six'; break;
        case 7: word = 'seven'; break;
        case 8: word = 'eight'; break;
        case 9: word = 'nine'; break;
        case 10: word = 'ten'; break;
        case 11: word = 'eleven'; break;
        case 12: word = 'twelve'; break;
        case 13: word = 'thirteen'; break;
        case 14: word = 'fourteen'; break;
        case 15: word = 'fifteen'; break;
        case 16: word = 'sixteen'; break;
        case 17: word = 'seventeen'; break;
        case 18: word = 'eighteen'; break;
        case 19: word = 'nineteen'; break;
        case 20: word = 'twenty'; break;
        case 21: word = 'twenty one'; break;
        case 22: word = 'twenty two'; break;
        case 23: word = 'twenty three'; break;
        case 24: word = 'twenty four'; break;
        case 25: word = 'twenty five'; break;
        case 26: word = 'twenty six'; break;
        case 27: word = 'twenty seven'; break;
        case 28: word = 'twenty eight'; break;
        case 29: word = 'twenty nine'; break;
        case 30: word = 'thirty'; break;
        case 31: word = 'thirty one'; break;
        case 32: word = 'thirty two'; break;
        case 33: word = 'thirty three'; break;
        case 34: word = 'thirty four'; break;
        case 35: word = 'thirty five'; break;
        default: word = null;
    }

    return word;
}

