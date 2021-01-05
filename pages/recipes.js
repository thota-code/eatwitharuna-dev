import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef, useReducer } from 'react';
import useSWR from 'swr';

import client from 'sanityio/sanity';

import { getAllRecipes } from 'sanityio/api';
import { useRouterRefresh } from 'utilities/hooks';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import RecipesGrid from 'components/RecipesGrid/RecipesGrid';
import GridForm from 'components/RecipesGrid/RecipesGridForm';

import s from 'styles/recipes.module.scss';

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
    // const [gridRecipes, setGridRecipes] = useState(recipes);
    const gridRecipes = useRef(recipes);

    const handleSearch = (e) => {
        e.preventDefault();
        if (e.target.value === 'DEFAULT') return;
        setSearch(e.target.value);
    };

    const handleSort = e => {
        e.preventDefault();
        if (e.target.value === "DEFAULT") return;
        setSort(e.target.value);
    };

    const handleSortDir = e => {
        e.preventDefault();
        if (e.target.value === "DEFAULT") return;
        (!sortDir || sortDir === 'asc') ? setSortDir('desc') : (sortDir === 'desc') ? setSortDir('asc') : '';
    };

    const handleFilterMain = e => {
        e.preventDefault();
        if (e.target.value === "DEFAULT") {
            gridRecipes.current = recipes;
            return;
        }

        setFilterMain(e.target.value);
        setFilterOptions('');
    };

    const handleFilterOptions = e => {
        e.preventDefault();
        if (e.target.value === "DEFAULT") return;
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
                case "asc":
                    return function (a, b) {
                        return a.prepTime.prepHours < b.prepTime.prepHours
                            ? 1
                            : a.prepTime.prepHours > b.prepTime.prepHours
                            ? -1
                            : 0;
                    };
                case "desc":
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
                case "asc":
                    return function (a, b) {
                        return a.cookTime.cookHours < b.cookTime.cookHours
                            ? 1
                            : a.cookTime.cookHours > b.cookTime.cookHours
                            ? -1
                            : 0;
                    };
                case "desc":
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
                case "asc":
                    return function (a, b) {
                        return a.totalTime.totalHours < b.totalTime.totalHours
                            ? 1
                            : a.totalTime.totalHours > b.totalTime.totalHours
                            ? -1
                            : 0;
                    };
                case "desc":
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
                case "asc":
                    return function (a, b) {
                        return a.difficulty < b.difficulty
                            ? 1
                            : a.difficulty > b.difficulty
                            ? -1
                            : 0;
                    };
                case "desc":
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
                case "asc":
                    return function (a, b) {
                        return a.numIngredients < b.numIngredients
                            ? 1
                            : a.numIngredients > b.numIngredients
                            ? -1
                            : 0;
                    };
                case "desc":
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
                case "asc":
                    return function (a, b) {
                        return a.recipeYield < b.recipeYield
                            ? 1
                            : a.recipeYield > b.recipeYield
                            ? -1
                            : 0;
                    };
                case "desc":
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

    const [, forceUpdate] = React.useState(0);

    useEffect(() => {
        if (sort) {
            gridRecipes.current.sort(sortR(sort))
        } else {
            gridRecipes.current.sort(sortR())
        };
    }, [sort, sortDir, gridRecipes]);

    useEffect(() => {
        if (filterMain === 'DEFAULT') {
            gridRecipes.current = recipes
        };
        if (!filterMain || !filterOptions) return;

        // if (filterMain === 'DEFAULT') {
        //     // gridRecipes = recipes
        //     console.log('aasdasdasd');
        // };

        const more = (
            recipes.reduce(function (result, rec) {
                if (rec[filterMain][0] === filterOptions) {
                    result.push(rec);
                }
                return result;
            }, [])
        );

        if (gridRecipes.current !== more) {
            gridRecipes.current = more;
            forceUpdate((n) => !n);
        }
    }, [filterMain, filterOptions, gridRecipes]);

    // console.log('sort: ', sort);
    // console.log('sortDir: ', sortDir);
    // console.log('filterMain: ', filterMain);
    // console.log('filterOptions: ', filterOptions);
    // console.log('gridRecipes: ', gridRecipes);
    // console.log('-----------');
    

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
                    <span className={s["recipes__main-title"]}>all recipes</span>
					<GridForm
						handleSearch={handleSearch}
						handleSort={handleSort}
						handleSortDir={handleSortDir}
						handleFilterMain={handleFilterMain}
						handleFilterOptions={handleFilterOptions}
					/>
					<RecipesGrid recipes={gridRecipes.current} numRecipes={12} />
				</main>

				<footer className={s["recipes__footer"]}>
					<Footer />
				</footer>
			</div>
		);
};


export default Recipes;