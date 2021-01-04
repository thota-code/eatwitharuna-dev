import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';

import client from 'sanityio/sanity';

import { getAllRecipes, getCustomRecipes } from 'sanityio/api';
import { useRouterRefresh } from 'utilities/hooks';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import RecipesGrid from 'components/RecipesGrid/RecipesGrid';
import GridForm from 'components/RecipesGrid/RecipesGridForm';

import s from 'styles/recipes.module.scss';

let queryMain = "*[_type=='recipe']";
// let queryMain = "*[_type=='recipe'] | order(numIngredients desc)";
// let queryMain = "*[_type=='recipe' && recipeHealth[0] == 'healthy'] | order(cookTime desc)"
// let queryMain = "*[_type=='recipe']";
// let queryMain = "*[_type=='recipe']";

export async function getServerSideProps(context) {
    const recipes = await client
        .fetch(queryMain)
        .catch((err) => console.log({ err }));

    // const test = await getCustomRecipes(queryMain2);

	return {
		props: {
            recipes,
		},
	};
};


const Recipes = ({ recipes }) => {
    // form handling, on recipes page for props 
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [sortDir, setSortDir] = useState('asc');
    const [filterMain, setFilterMain] = useState('');
    const [filterOptions, setFilterOptions] = useState('');
    const [gridRecipes, setGridRecipes] = useState(recipes);
    
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const handleSort = e => {
        e.preventDefault();
        setSort(e.target.value);
    };

    const handleSortDir = e => {
        e.preventDefault();
        (!sortDir || sortDir === 'asc') ? setSortDir('desc') : setSortDir('asc');
    };

    const handleFilterMain = e => {
        e.preventDefault();
        setFilterMain(e.target.value);
        setFilterOptions('');
    };

    const handleFilterOptions = e => {
        e.preventDefault();
        setFilterOptions(e.target.value);
    };

    // query handling
    let baseQuery = "*[_type=='recipe'";
    let filterQuery = (filterMain && filterOptions) ? ` && ${filterMain}[0] == '${filterOptions}']` : "]";
    let sortQuery = (sort && sortDir) ? ` | order(${sort} ${sortDir})` : "";
    const finalQuery = baseQuery + filterQuery + sortQuery;
    
    const initRec = recipes;
    const { data, mutate } = useSWR(finalQuery, getCustomRecipes, {initialData: initRec});
    // setGridRecipes(data);
    
    console.log('fq: ', finalQuery);
    console.log('data: ', data);
    console.log('gridRecipes: ', gridRecipes);
    (data !== gridRecipes) ? setGridRecipes(data) : console.log('nothing');
    // console.log('data == recipes', data === recipes);


    return (
			<div className={s["recipes"]}>
				<Head>
					<title>Recipes</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>

				{/* <Navbar className={s["recipes__nav"]} /> */}

				<main className={s["recipes__main"]}>
					<GridForm
						handleSearch={handleSearch}
						handleSort={handleSort}
						handleSortDir={handleSortDir}
						handleFilterMain={handleFilterMain}
						handleFilterOptions={handleFilterOptions}
					/>
					<RecipesGrid recipes={gridRecipes} numRecipes={12} />
				</main>

				<footer className={s["recipes__footer"]}>
					<Footer />
				</footer>
			</div>
		);
};

// export async function formQuery(query, params) {
// 	console.log("api:", query);

// 	const res = await client
// 		.fetch(query, params)
// 		.catch((err) => console.log({ err }));

// 	return res;
// }


export default Recipes;