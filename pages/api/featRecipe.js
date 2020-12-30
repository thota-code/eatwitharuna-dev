import { getAllFeaturableRecipes } from 'sanityio/api';

// purpose of featRecipe api //

// return new Featurable recipe, using getAllFeaturableRecipes sanity api call
// minimum 5 new recipes before repeated, randomized
// req here returns FULL recipe object

function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default async function handler(req, res) {
    const allRecipes = await getAllFeaturableRecipes();
    
    let currL = allRecipes.length;
    let randIdx = generateRandomInteger(0, currL-1);
    let featRec = allRecipes[randIdx];

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(featRec);
}