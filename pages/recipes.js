import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

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
    // forceUpdate
    const [, forceUpdate] = React.useState(0);

    // form handling, on recipes page for props
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('totalTime');
    const [sortDir, setSortDir] = useState('asc');
    const [filterMain, setFilterMain] = useState('');
    const [filterOptions, setFilterOptions] = useState('');
    // const [gridRecipes, setGridRecipes] = useState(recipes);
    const gridRecipes = useRef(recipes);

    // handlers  
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
        if (e.target.value === "DEFAULT") return;

        setFilterMain(e.target.value);
        setFilterOptions('');
    };

    const handleFilterOptions = e => {
        e.preventDefault();
        if (e.target.value === "DEFAULT") return;

        setFilterOptions(e.target.value);
    };

    const handleReset = e => {
        setSearch('');
        setSort('');
        // figure out set sort dir behavior upon reset
        setFilterMain('');
        setFilterOptions('');
        gridRecipes.current = recipes;
    }

    // NOTE JAN 5 2021
    // Logic of form MUST be refactored to pull from gridRecipes.current instead of recipes in the 
    // filter and search handlers. Be warned, the current implementation is not correct. Remove comments if fixed.

    // sort logic
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

    // sort useEffect
    useEffect(() => {
        if (sort) {
            gridRecipes.current.sort(sortR(sort))
        } else {
            gridRecipes.current.sort(sortR())
        };
    }, [sort, sortDir, gridRecipes]);

    // filter useEffect
    useEffect(() => {
        if (!filterMain || !filterOptions) return;


        const filt = (
            recipes.reduce(function (result, rec) {
                if (rec[filterMain][0] === filterOptions) {
                    result.push(rec);
                }
                return result;
            }, [])
        );

        if (gridRecipes.current !== filt) {
            gridRecipes.current = filt;
            forceUpdate((n) => !n);
        }
    }, [filterMain, filterOptions, gridRecipes]);

    useEffect(() => {
        const resSort = (a, b) => {
            return (a.title.charAt(0).toLowerCase().includes(search.charAt(0).toLowerCase())) ? -1 
                : 1;
        }

        const searchRes = (
            recipes.reduce(function (result, rec) {
                if (rec.title.toLowerCase().includes(search.toLowerCase())) result.push(rec);
                return result.sort(resSort);
            }, [])
        );

        if (gridRecipes.current !== searchRes) {
            gridRecipes.current = searchRes;
            forceUpdate(n => !n);
        }

    }, [search, gridRecipes])

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

				<div className={s["recipes__Mcorner"]}>
					<Image
						src="/MLarge.svg"
						className={s["recipes__Mcorner-img"]}
						height={200}
						width={200}
					/>
				</div>

				<Navbar className={s["recipes__nav"]} />

				<main className={s["recipes__main"]}>
					<span className={s["recipes__main-title"]}>all recipes</span>
					<GridForm
						handleSearch={handleSearch}
						handleSort={handleSort}
						handleSortDir={handleSortDir}
						handleFilterMain={handleFilterMain}
						handleFilterOptions={handleFilterOptions}
						handleReset={handleReset}
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