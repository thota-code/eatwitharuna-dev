import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import client from 'sanityio/sanity';

// import { getAllRecipes, formQuery } from 'sanityio/api';
// import { getAllRecipes } from 'sanityio/api';
import { getAllRecipes, testQueries } from 'sanityio/api';
import { useRouterRefresh } from 'utilities/hooks';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import RecipesGrid from 'components/RecipesGrid/RecipesGrid';
import GridForm from 'components/RecipesGrid/RecipesGridForm';

import s from 'styles/recipes.module.scss';

// let queryMain = "*[_type=='recipe']";
let queryMain = "*[_type=='recipe'] | order(numIngredients desc)";
// let queryMain = "*[_type=='recipe']";
// let queryMain = "*[_type=='recipe']";

export async function getServerSideProps(context) {
	// let recipes = await formQuery(query);
	// const recipes = await getAllRecipes();
	// const tester = await testQueries();

    const recipes = await client
        .fetch(queryMain)
        .catch((err) => console.log({ err }));

	return {
		props: {
            recipes,
		},
	};
};


const Recipes = ({ recipes, TESTERQUERY }) => {
    const recRouter = useRouter();
    const refreshData = () => recRouter.replace(recRouter.asPath);

    // form handling, on recipes page for props 
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [sortDir, setSortDir] = useState('asc');
    const [filterMain, setFilterMain] = useState('');
    const [filterOptions, setFilterOptions] = useState('');
    
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
    let filterQuery = (filterMain && filterOptions) ? ` && ${filterMain}[0] == ${filterOptions}]` : "]";
    let sortQuery = (sort && sortDir) ? ` | order(${sort} ${sortDir})` : "";

    const finalQuery = baseQuery + filterQuery + sortQuery;
    // console.log('queryMain', queryMain);
    console.log('finalQuery initial', finalQuery);
    // console.log('assignment of queryMain', queryMain = finalQuery);
    console.log('queryMain again', queryMain);
    // console.log('tester', TESTERQUERY += 1);
    // ((queryMain !== TESTERQUERY) && (typeof window !== 'undefined')) ? refreshData() : '';


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
					<RecipesGrid recipes={recipes} numRecipes={12} />
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