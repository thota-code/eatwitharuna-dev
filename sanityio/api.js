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

