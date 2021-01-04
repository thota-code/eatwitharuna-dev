import client from './sanity';

// featured recipe call =
export async function getAllFeaturableRecipes(p) {
    const query = "*[_type == 'recipe' && allowFeatured]"
    const params = {};

    const res = await client
        .fetch(query, params)
        .catch(err => console.log({ err }))

    return res;
};

// all recipes
export async function getAllRecipes() {
    const query = "*[_type == 'recipe']";
    const params = {};

    debugger;
    
    const res = await client
        .fetch(query)
        .catch(err => console.log({ err }))

    return res;
};

export async function getSingleRecipe(slug) {
    // const query = "*[_type == 'recipe' && slug.current == $slug]{ ..., 'allIng': recipeIngredients[]{measurement, amount, ingredient->}}";

    // test imageurl
    const query = "*[_type == 'recipe' && slug.current == $slug]{ ..., 'allIng': recipeIngredients[]{measurement, amount, ingredient->}, 'testImageUrl': images.image_main.asset -> url }";
    const params = {slug};

    const res = await client
        .fetch(query, params)
        .catch(err => console.log({ err }));

    return res;
};

export async function formQuery(query, params) {
    console.log('api:', query);

    const res = await client
        .fetch(query, params)
        .catch(err => console.log({ err }));

    return res;
}

export async function testQueries(num) {
    console.log('here');


}