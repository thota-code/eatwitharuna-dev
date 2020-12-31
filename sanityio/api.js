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

    const res = await client
        .fetch(query)
        .catch(err => console.log({ err }));

    return res;
};

export async function getSingleRecipe(slug) {
    const query = "*[_type == 'recipe' && slug.current == $slug]{ ..., 'allIng': recipeIngredients[]{measurement, amount, ingredient->}}";
    const params = {slug};

    const res = await client
        .fetch(query, params)
        .catch(err => console.log({ err }));

    return res;
};