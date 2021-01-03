import Link from 'next/link';
import Head from 'next/head';
import React, { useState } from 'react';

import { getAllRecipes, formQuery } from 'sanityio/api';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import RecipesGrid from 'components/RecipesGrid/RecipesGrid';
import GridForm from 'components/RecipesGrid/RecipesGridForm';

import s from 'styles/recipes.module.scss';

const queryHandler = (search, sort, sortDir, filterMain, filterOptions) => {
	// query handling
	let baseQuery = "*[_type=='recipe'";
	let filterQuery =
		filterMain && filterOptions
			? ` && ${filterMain}[0] == ${filterOptions}]`
			: "]";
    let sortQuery = sort && sortDir ? ` | order(${sort} ${sortDir})` : "";
    
    const finalQuery = baseQuery + filterQuery + sortQuery;
    console.log(finalQuery);

    return finalQuery;
}

const Recipes = ({ recipes }) => {
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


    queryHandler(search, sort, sortDir, filterMain, filterOptions);


    return (
			<div className={s["recipes"]}>
				<Head>
					<title>Recipes</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>

				<Navbar className={s["recipes__nav"]} />

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


// switch to serverside props vvvvvv
export async function getServerSideProps(context) {
    // const recipes = await formQuery(finalQuery);
    const recipes = await getAllRecipes();

    return {
        props: {
            recipes
        }
    }
};

export default Recipes;