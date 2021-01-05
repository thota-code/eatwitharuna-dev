import { useState } from 'react';

import s from './RecipesGridForm.module.scss';


const GridForm = ({ handleSearch, handleSort, handleSortDir, handleFilterMain, handleFilterOptions }) => {
    
    const form = () => {
        const [filterType, setFilterType] = useState("");
        const [def, setDef] = useState('DEFAULT');
        const [butDir, setButDir] = useState({ __html: "asc&nbsp;↑" });

        const handleButton = e => {
            handleSortDir(e);
            // switch (butDir) {
            //     case {__html: 'asc'}: setButDir({__html: 'desc'}); break;
            //     case {__html: 'desc'}: setButDir({__html: 'asc'}); break;
            // }

            if (butDir.__html === "asc&nbsp;↑") {
							setButDir({ __html: "desc↓" });
						};
            if (butDir.__html === "desc↓") {
							setButDir({ __html: "asc&nbsp;↑" });
						};
        }

        const filterOptions = () => {
            switch (filterType) {
                case "recipeCategory":
                    return (
                        <>
                            <option defaultValue value="DEFAULT">-</option>
                            <option value="snack">snack</option>
                            <option value="meal">meal</option>
                            <option value="dessert">dessert</option>
                            <option value="drink">drink</option>
                        </>
                    );
                case "recipeHealth":
                    return (
                        <>
                            <option defaultValue value="DEFAULT">-</option>
                            <option value="healthy">healthy</option>
                            <option value="comfort">comfort</option>
                        </>
                    );
                case "recipeHeft":
                    return (
                        <>
                            <option defaultValue value="DEFAULT">-</option>
                            <option value="heavy">heavy</option>
                            <option value="light">light</option>
                        </>
                    );
                case "suitableForDiet":
                    return (
                        <>
                            <option defaultValue value="DEFAULT">-</option>
                            <option default value="vegetarian">vegetarian</option>
                            <option value="non-vegetarian">non-vegetarian</option>
                            <option value="halal" disabled>halal</option>
                            <option value="vegan" disabled>vegan</option>
                        </>
                    );
                default:
                    return (
                        <option value="DEFAULT">
                            -
                        </option>
                    );
            }
        };

        return (
					<>
						<div
							className={s["gridForm__form--search-div"]}
							onChange={(e) => handleSearch(e)}
						>
							<span className={s["gridForm__form--search-search"]}>search</span>
							<input type="search" placeholder="-" className={s["gridForm__form--search-input"]}></input>
						</div>

                        <div className={s["gridForm__form--reset-div"]}>
                            <button className={s["gridForm__form--reset-btn"]}>- reset -</button>
                        </div>

						<div className={s["gridForm__form--sort-div"]}>
							<span className={s["gridForm__form--sort-sort"]}>sort</span>
							<select
								name="sort"
								defaultValue={"DEFAULT"}
								onChange={(e) => handleSort(e)}
								className={s["gridForm__form--sort-select"]}
							>
								<option
									className={s["gridForm__form--sort-select-first"]}
									value="DEFAULT"
									disabled
								>
									-
								</option>

								<option className={s["option"]} value="totalTime">
									total time
								</option>
								<option className={s["option"]} value="difficulty">
									difficulty
								</option>
								<option className={s["option"]} value="numIngredients">
									num of ingredients
								</option>
								<option className={s["option"]} value="recipeYield">
									serve amount
								</option>
								<option className={s["option"]} value="prepTime">
									prep time
								</option>
								<option className={s["option"]} value="cookTime">
									cook time
								</option>
							</select>
							<button
								onClick={(e) => handleButton(e)}
								className={s["gridForm__form--sort-dir"]}
								dangerouslySetInnerHTML={butDir}
							></button>
						</div>

						<div className={s["gridForm__form--filter-div"]}>
							<span className={s["gridForm__form--filter-filter"]}>filter</span>
							<select
								name="filter-main"
								onChange={(e) => {
									setFilterType(e.target.value);
									handleFilterMain(e);
								}}
								defaultValue={"DEFAULT"}
								className={s["gridForm__form--filter-select"]}
							>
                                <option 
                                    value="DEFAULT"
                                    className={s["gridForm__form--filter-select-first"]}
                                >-</option>

								<option value="recipeCategory">category</option>
								<option value="recipeHealth">healthiness</option>
								<option value="recipeHeft">heft of meal</option>
								<option value="suitableForDiet">diet</option>
							</select>
							<select
								name="filter-options"
								onChange={(e) => handleFilterOptions(e)}
                                defaultValue={def}
                                className={s["gridForm__form--filter-select"]}
							>
								{filterOptions()}
							</select>
						</div>
					</>
				);
    };

	return (
		<div className={s["gridForm"]}>
			<div className={s["gridForm__form"]}>{form()}</div>
			<div className={s["gridForm__text"]}>
				<span className={s["gridForm__text-top"]}>
					filter and search for all recipes
				</span>
				<span className={s["gridForm__text-bottom"]}>
					use the{" "}
					<a href="/" className={s["gridForm__text-italic"]}>navbar search</a> or{" "}
					<a href="/pantry" className={s["gridForm__text-italic"]}>pantry</a> for deeper
					searches
				</span>
			</div>
		</div>
	);
};

export default GridForm;