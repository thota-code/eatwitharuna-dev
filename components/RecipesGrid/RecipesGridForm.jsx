import { useState } from 'react';

import s from './RecipesGridForm.module.scss';


const GridForm = ({ handleSearch, handleSort, handleSortDir, handleFilterMain, handleFilterOptions }) => {

    const form = () => {
        const [filterType, setFilterType] = useState("");
        const filterOptions = () => {
            switch (filterType) {
                case "recipeCategory":
                    return (
                        <>
                            <option value="snack">snack</option>
                            <option value="meal">meal</option>
                            <option value="dessert">dessert</option>
                            <option value="drink">drink</option>
                        </>
                    );
                case "recipeHealth":
                    return (
                        <>
                            <option value="healthy">healthy</option>
                            <option value="comfort">comfort</option>
                        </>
                    );
                case "recipeHeft":
                    return (
                        <>
                            <option value="heavy">heavy</option>
                            <option value="light">light</option>
                        </>
                    );
                case "suitableForDiet":
                    return (
                        <>
                            <option value="vegetarian">vegetarian</option>
                            <option value="non-vegetarian">non-vegetarian</option>
                            <option value="halal" disabled>
                                halal
                            </option>
                            <option value="vegan" disabled>
                                vegan
                            </option>
                        </>
                    );
                default:
                    return (
                        <option value="hmm" disabled>
                            hmm...
                        </option>
                    );
            }
        };

        return (
					<>
						<div className={s["gridForm__form--search-div"]} onChange={e => handleSearch(e)}>
							search
							<input type="search" placeholder="search"></input>
						</div>

						<div className={s["gridForm__form--sort-div"]}>
							sort
							<select name="sort" onChange={e => handleSort(e)}>
								<option value="difficulty">difficulty</option>
								<option value="numIngredients">num of ingredients</option>
								<option value="prepTime">prep time</option>
								<option value="cookTime">cook time</option>
								<option value="totalTime">total time</option>
								<option value="recipeYield">serve amount</option>
							</select>
							<button onClick={e => handleSortDir(e)}>asc/desc</button>
						</div>

						<div className={s["gridForm__form--filter-div"]}>
							filter
							<select
								name="filter-main"
								onChange={(e) => {
                                    setFilterType(e.target.value);
                                    // console.log(e.target.value);
									handleFilterMain(e);
								}}
							>
								<option value="recipeCategory">category</option>
								<option value="recipeHealth">healthiness</option>
								<option value="recipeHeft">heft of meal</option>
								<option value="suitableForDiet">diet</option>
							</select>
							<select
								name="filter-options"
								onChange={(e) => handleFilterOptions(e)}
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
			<div className={s["gridForm__text"]}>MF the supervillain</div>
		</div>
	);
};

export default GridForm;