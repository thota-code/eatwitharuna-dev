import { useState } from 'react';
import Image from 'next/image';
import ProgressBar from 'react-customizable-progressbar';

import s from './SingleRecipe.module.scss';
import { durationFix } from 'utilities/util';

export default function SingleRecipe({ cR }) {
    // todo -
    // functions for light color of times under image

    const [currentRecipe, setCurrentRecipe] = useState(cR);
    const {
			recipeCategory,
			recipeHeft,
			suitableForDiet,
			prepTime,
			cookTime,
			totalTime,
            recipeIngredients,
            allIng,
			summary,
			difficulty,


            testImageUrl,
		} = currentRecipe;

    const tagsline = () => {
        let diet = suitableForDiet === 'vegetarian' ? 'veg' : 'non-veg'; // extend for future cases
        return (
					<span>
						{recipeCategory} · {recipeHeft} · {diet}
					</span>
				);
    }

    const ingredientsRender = () => {
			return (
				<table className={s["recipe__head-main--ingredients-table"]}>
					<tbody>
						<tr className={s["recipe__head-main--ingredients-table-row"]}>
							<td></td>&nbsp;
						</tr>
						{allIng.map((ing, idx) => {
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

	const difficultyBar = () => {

		// return (

		// );
	};

    return (
			<div className={s["recipe"]}>
				<div className={s["recipe__head"]}>
					<div className={s["recipe__head-title-tagsline"]}>
						<div className={s["recipe__head-title"]}>{currentRecipe.title}</div>
						<div className={s["recipe__head-tagsline"]}>{tagsline()}</div>
					</div>

					<div className={s["recipe__head-main"]}>
						<div className={s["recipe__head-main--ingredients"]}>
							<span className={s["recipe__head-main--ingredients-title"]}>
								ingredients
							</span>

							{ingredientsRender()}
						</div>

						<div className={s["recipe__head-main--summary"]}>
							<span className={s["recipe__head-main--summary-main"]}>
								{summary.summary_main}
							</span>
							<span className={s["recipe__head-main--summary-byline"]}>
								{summary.summary_byline}
							</span>
						</div>
					</div>

					<div className={s["recipe__head-diff-image-info"]}>
						<div className={s["recipe__head-diff"]}>
							{difficultyBar()}
						</div>

						<div className={s["recipe__head-image"]}>
							{/* TESTIMAGEURL NOW! */}
							<Image
								src={testImageUrl}
								alt=""
								className={s["recipe__head-image-img"]}
								width={550}
								height={550}
								layout="responsive"
							/>
						</div>

						<div className={s["recipe__head-info"]}>
							<div className={s["recipe__head-info-time-serves"]}>
								<div className={s["recipe__head-info--total"]}>
									<span className={s["recipe__head-info--total-text"]}>
										total time:{" "}
										<span className={s["recipe__head-info--total-num"]}>
											{durationFix(
												totalTime.totalHours,
												totalTime.totalMinutes
											)}
										</span>
									</span>
								</div>
								<div className={s["recipe__head-info--serves"]}>
									<span className={s["recipe__head-info--serves-text"]}>
										serves:{" "}
										<span className={s["recipe__head-info--serves-num"]}>
											{currentRecipe.recipeYield}
										</span>
									</span>
								</div>
							</div>

							<div className={s["recipe__head-info-prep-cook"]}>
								<div className={s["recipe__head-info--prep"]}>
									<span className={s["recipe__head-info--prep-text"]}>
										prep time:{" "}
										<span className={s["recipe__head-info--prep-num"]}>
											{durationFix(prepTime.prepHours, prepTime.prepMinutes)}
										</span>
									</span>
								</div>
								<div className={s["recipe__head-info--cook"]}>
									<span className={s["recipe__head-info--cook-text"]}>
										cook time:{" "}
										<span className={s["recipe__head-info--cook-num"]}>
											{durationFix(cookTime.cookHours, cookTime.cookMinutes)}
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
