import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import client from 'sanityio/sanity';

import { getAllRecipes } from 'sanityio/api';
import { useRouterRefresh } from 'utilities/hooks';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import RecipesGrid from 'components/RecipesGrid/RecipesGrid';
import GridForm from 'components/RecipesGrid/RecipesGridForm';

import s from 'styles/recipes.module.scss';

// let queryMain = "*[_type=='recipe']";
// let queryMain = "*[_type=='recipe'] | order(numIngredients desc)";
// let queryMain = "*[_type=='recipe' && recipeHealth[0] == 'healthy'] | order(cookTime desc)"
// let queryMain = "*[_type=='recipe']";
// let queryMain = "*[_type=='recipe']";

export async function getServerSideProps(context) {
    const recipes = await getAllRecipes();

	return {
		props: {
            recipes,
		},
	};
};


const Recipes = ({ recipes }) => {
    // form handling, on recipes page for props
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('totalTime');
    const [sortDir, setSortDir] = useState('desc');
    const [filterMain, setFilterMain] = useState('');
    const [filterOptions, setFilterOptions] = useState('');
    const [gridRecipes, setGridRecipes] = useState(recipes);

    // console.log('gridRecipes f: ', gridRecipes);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const handleSort = e => {
        e.preventDefault();
        setSort(e.target.value);

        setGridRecipes(gridRecipes.sort(sortR(sort)));
        console.log('handleSort', gridRecipes);
    };

    const handleSortDir = e => {
        e.preventDefault();
        (!sortDir || sortDir === 'asc') ? setSortDir('desc') : (sortDir === 'desc') ? setSortDir('asc') : '';
        
        setGridRecipes(gridRecipes.sort(sortR()));
    };

    const handleFilterMain = e => {
        e.preventDefault();
        setFilterMain(e.target.value);
    };

    const handleFilterOptions = e => {
        e.preventDefault();
        setFilterOptions(e.target.value);
    };

    const sortR = (sortROption='totalTime') => {
        // prepTime
        // cookTime
        // totalTime
        // difficulty
        // numIngredients
        // recipeYield

        const prepTime = () => {
            switch (sortDir) {
                case "desc":
                    return function (a, b) {
                        return a.prepTime.prepHours < b.prepTime.prepHours
                            ? 1
                            : a.prepTime.prepHours > b.prepTime.prepHours
                            ? -1
                            : 0;
                    };
                case "asc":
                    return function (a, b) {
                        return a.prepTime.prepHours > b.prepTime.prepHours
                            ? 1
                            : a.prepTime.prepHours < b.prepTime.prepHours
                            ? -1
                            : 0;
                    };
            }
        };

        const cookTime = () => {
            switch (sortDir) {
                case "desc":
                    return function (a, b) {
                        return a.cookTime.cookHours < b.cookTime.cookHours
                            ? 1
                            : a.cookTime.cookHours > b.cookTime.cookHours
                            ? -1
                            : 0;
                    };
                case "asc":
                    return function (a, b) {
                        return a.cookTime.cookHours > b.cookTime.cookHours
                            ? 1
                            : a.cookTime.cookHours < b.cookTime.cookHours
                            ? -1
                            : 0;
                    };
            }
        };

        const totalTime = () => {
            switch (sortDir) {
                case "desc":
                    return function (a, b) {
                        return a.totalTime.totalHours < b.totalTime.totalHours
                            ? 1
                            : a.totalTime.totalHours > b.totalTime.totalHours
                            ? -1
                            : 0;
                    };
                case "asc":
                    return function (a, b) {
                        return a.totalTime.totalHours > b.totalTime.totalHours
                            ? 1
                            : a.totalTime.totalHours < b.totalTime.totalHours
                            ? -1
                            : 0;
                    };
            }
        };

        const difficulty = () => {
            switch (sortDir) {
                case "desc":
                    return function (a, b) {
                        return a.difficulty < b.difficulty
                            ? 1
                            : a.difficulty > b.difficulty
                            ? -1
                            : 0;
                    };
                case "asc":
                    return function (a, b) {
                        return a.difficulty > b.difficulty
                            ? 1
                            : a.difficulty < b.difficulty
                            ? -1
                            : 0;
                    };
            }
        };

        const numIngredients = () => {
            switch (sortDir) {
                case "desc":
                    return function (a, b) {
                        return a.numIngredients < b.numIngredients
                            ? 1
                            : a.numIngredients > b.numIngredients
                            ? -1
                            : 0;
                    };
                case "asc":
                    return function (a, b) {
                        return a.numIngredients > b.numIngredients
                            ? 1
                            : a.numIngredients < b.numIngredients
                            ? -1
                            : 0;
                    };
            }
        };

        const recipeYield = () => {
            switch (sortDir) {
                case "desc":
                    return function (a, b) {
                        return a.recipeYield < b.recipeYield
                            ? 1
                            : a.recipeYield > b.recipeYield
                            ? -1
                            : 0;
                    };
                case "asc":
                    return function (a, b) {
                        return a.recipeYield > b.recipeYield
                            ? 1
                            : a.recipeYield < b.recipeYield
                            ? -1
                            : 0;
                    };
            }
        };

        // console.log('sort: ', sortROption, 'sortDir: ', sortDir);

        switch (sortROption) {
            default:

            case "prepTime":
                return prepTime();

            case "cookTime":
                return cookTime();

            case "totalTime":
                return totalTime();

            case "difficulty":
                return difficulty();

            case "numIngredients":
                return numIngredients();

            case "recipeYield":
                return recipeYield();
        }
    };

    Object.filter = (obj, predicate) => {
        Object.keys(obj)
            .filter(key => predicate(obj[key]))
            .reduce ((res, key) => (res[key] = obj[key], res), {});
    }

    const filterR = (rec, filterMain, filterOptions) => {
        // recipeCategory
        // recipeHeft
        // recipeHealth
        // suitableForDiet

        if (rec.filterMain[0] === filterOptions) {

        }
    }

    // allowFeatured: true
    // cookTime: {_type: "document", cookHours: 1, cookMinutes: 10}
    // difficulty: 1
    // images: {_type: "document", image_2: {…}, image_main: {…}}
    // numIngredients: 2
    // prepTime: {_type: "document", prepHours: 2, prepMinutes: 50}
    // recipeCategory: ["dessert"]
    // recipeHealth: ["comfort"]
    // recipeHeft: ["light"]
    // recipeIngredients: (2) [{…}, {…}]
    // recipeInstructions: (3) [{…}, {…}, {…}]
    // recipeYield: 123
    // slug: {_type: "slug", current: "cookies-and-milk"}
    // suitableForDiet: ["vegetarian"]
    // summary: {_type: "document", summary_byline: ":o and milk!", summary_main: "COOKIES!"}
    // title: "Cookies and Milk"
    // totalTime: {_type: "document", totalHours: 3, totalMinutes: 0}
    // _createdAt: "2020-12-29T23:51:36Z"
    // _id: "0e057684-0438-4450-999a-6a5fc96c1494"
    // _rev: "j8deEMcViQHUvHOrEzRBP5"
    // _type: "recipe"
    // _updatedAt: "2020-12-31T04:24:20Z"
    // __proto__: Object

    // pushed into util later

    // all sort functions
    // console.log(sort)
    // console.log(sortDir)

    

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