import client from './sanity';

// const query = '*[_type == $docType] {title, recipeIngredients, recipeInstructions, allowFeatured}';
// const params = {docType: 'recipe'};


// export async function getSomeRecipes() {
//     const results = await client
//         .fetch(query, params)
//         .then(recipes => {
//             console.log('recipes: ');
//             recipes.forEach(rec => console.log(rec.recipeInstructions));
//         })
// };

// featured recipe call =
export async function getAllFeaturableRecipes(p) {
    const query = "*[_type == 'recipe' && allowFeatured]"
    const params = {};

    const res = await client
        .fetch(query, params)

    return res;
};