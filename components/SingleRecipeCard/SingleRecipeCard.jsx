import { useState } from 'react';
import Image from 'next/image';
import ProgressBar from 'react-customizable-progressbar';

import s from './SingleRecipe.module.scss';
import { durationFix } from 'utilities/util';

export default function SingleRecipe({ cR }) {
    // todo -
    // functions for light color of times under image

    const [currentRecipe, setCurrentRecipe] = useState(cR);
    // const {
			// recipeCategory,
			// recipeHeft,
			// suitableForDiet,
			// prepTime,
			// cookTime,
			// totalTime,
            // recipeIngredients,
            // allIng,
			// summary,
			// difficulty,
			// mainImageUrl,
			// recipeColor
		// } = currentRecipe;

		// console.log(cR);

    const tagsline = () => {
        let diet = currentRecipe?.suitableForDiet === 'vegetarian' ? 'veg' : 'non-veg'; // extend for future cases
        return (
					<span>
						{currentRecipe?.recipeCategory || ""} · {currentRecipe?.recipeHeft || ""} · {currentRecipe?.suitableForDiet ? diet : ""}
					</span>
				);
	}
	
	let style = currentRecipe?.recipeColor
		? {
				background: `linear-gradient(to right, ${currentRecipe?.recipeColor.value}, 95%, #DDD8C4 5%)`,
		  }
		: {
				background: `linear-gradient(to right, #327158, 95%, #DDD8C4 5%)`,
		  };

	console.log(style);

    const ingredientsRender = () => {
			return (
				<table className={s["recipe__head-main--ingredients-table"]}>
					<tbody>
						<tr className={s["recipe__head-main--ingredients-table-row"]}>
							<td></td>&nbsp;
						</tr>
						{currentRecipe?.allIng.map((ing, idx) => {
							return (
								<tr
									key={idx}
									className={s["recipe__head-main--ingredients-table-row"]}
								>
									<td>{ing.ingredient.ingName}</td>
									<td>
										{ing.amount} {ing.measurement}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		}

	// const difficultyBar = () => {

	// 	return (

	// 	);
	// };

    return (
			<div className={s["recipe"]}>
				<div className={s["recipe__head"]}>
					<div className={s["recipe__head-title-tagsline"]}>
						<div className={s["recipe__head-title"]}>{currentRecipe?.title}</div>
						<div className={s["recipe__head-tagsline"]}>{tagsline()}</div>
					</div>

					<div className={s["recipe__head-main"]} style={style}>
						<div className={s["recipe__head-main--ingredients"]}>
							<span className={s["recipe__head-main--ingredients-title"]}>
								ingredients
							</span>

							{ingredientsRender()}
						</div>

						<div className={s["recipe__head-main--summary"]}>
							<span className={s["recipe__head-main--summary-main"]}>
								{currentRecipe?.summary?.summary_main}
							</span>
							<span className={s["recipe__head-main--summary-byline"]}>
								{currentRecipe?.summary?.summary_byline}
							</span>
						</div>
					</div>

					<div className={s["recipe__head-diff-image-info"]}>
						<div className={s["recipe__head-diff"]}>
							{/* {difficultyBar()} */}
							{currentRecipe?.difficulty}
						</div>

						<div className={s["recipe__head-image"]}>
							{/* TESTIMAGEURL NOW! */}
							{currentRecipe?.mainImageUrl && (
								<Image
									src={currentRecipe?.mainImageUrl}
									alt=""
									className={s["recipe__head-image-img"]}
									width={350}
									height={350}
									// width={200}
									// height={200}
									layout="responsive"
								/>
							)}
						</div>

						<div className={s["recipe__head-info"]}>
							<div className={s["recipe__head-info-time-serves"]}>
								<div className={s["recipe__head-info--total"]}>
									<span className={s["recipe__head-info--total-text"]}>
										total time:{" "}
										<span className={s["recipe__head-info--total-num"]}>
											{(currentRecipe?.totalTime?.totalHours && currentRecipe?.totalTime?.totalMinutes) ? durationFix(
												currentRecipe?.totalTime?.totalHours,
												currentRecipe?.totalTime?.totalMinutes
											) : ""}
										</span>
									</span>
								</div>
								<div className={s["recipe__head-info--serves"]}>
									<span className={s["recipe__head-info--serves-text"]}>
										serves:{" "}
										<span className={s["recipe__head-info--serves-num"]}>
											{currentRecipe?.recipeYield}
										</span>
									</span>
								</div>
							</div>

							<div className={s["recipe__head-info-prep-cook"]}>
								<div className={s["recipe__head-info--prep"]}>
									<span className={s["recipe__head-info--prep-text"]}>
										prep time:{" "}
										<span className={s["recipe__head-info--prep-num"]}>
											{(currentRecipe?.prepTime?.prepMinutes && currentRecipe?.prepTime?.prepHours) ? durationFix(currentRecipe.prepTime?.prepHours, currentRecipe.prepTime?.prepMinutes) : ""}
										</span>
									</span>
								</div>
								<div className={s["recipe__head-info--cook"]}>
									<span className={s["recipe__head-info--cook-text"]}>
										cook time:{" "}
										<span className={s["recipe__head-info--cook-num"]}>
											{/* {durationFix(cookTime.cookHours, cookTime.cookMinutes)} */}
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* actual steps go here */}
			</div>
		);
}


						// <tr className={s["recipe__head-main--ingredients-table-row"]}>
						// 	{/* <td></td>&nbsp; */}
						// </tr>
						// <tr className={s["recipe__head-main--ingredients-table-row"]}>
						// 	<td>onion</td>
						// 	<td>1 cup</td>
						// </tr>
						// <tr className={s["recipe__head-main--ingredients-table-row"]}>
						// 	<td>green onion</td>
						// 	<td>twelve</td>
						// </tr>
						// <tr className={s["recipe__head-main--ingredients-table-row"]}>
						// 	<td>cilantro</td>
						// 	<td>1/2 bunch</td>
						// </tr>
						// <tr className={s["recipe__head-main--ingredients-table-row"]}>
						// 	<td>cinnamon stick</td>
						// 	<td>two small</td>
						// </tr>
						// <tr className={s["recipe__head-main--ingredients-table-row"]}>
						// 	<td>shrimp</td>
						// 	<td>2 lbs</td>
						// </tr>
						// <tr className={s["recipe__head-main--ingredients-table-row"]}>
						// 	<td>coriander powder</td>
						// 	<td>1 tsp</td>
						// </tr>
						// <tr className={s["recipe__head-main--ingredients-table-row"]}>
						// 	<td>ginger garlic paste</td>
						// 	<td>1 tbsp</td>
						// </tr>
