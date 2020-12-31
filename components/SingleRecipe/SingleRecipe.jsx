import { useState } from 'react';

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

    }

    return (
        <div className={s["recipe"]}>
                {ingredientsRender()}
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

							<table className={s["recipe__head-main--ingredients-table"]}>
								<tbody>
									<tr className={s["recipe__head-main--ingredients-table-row"]}>
										{/* <td></td>&nbsp; */}
									</tr>
									<tr className={s["recipe__head-main--ingredients-table-row"]}>
										<td>onion</td>
										<td>1 cup</td>
									</tr>
									<tr className={s["recipe__head-main--ingredients-table-row"]}>
										<td>green onion</td>
										<td>twelve</td>
									</tr>
									<tr className={s["recipe__head-main--ingredients-table-row"]}>
										<td>cilantro</td>
										<td>1/2 bunch</td>
									</tr>
									<tr className={s["recipe__head-main--ingredients-table-row"]}>
										<td>cinnamon stick</td>
										<td>two small</td>
									</tr>
									<tr className={s["recipe__head-main--ingredients-table-row"]}>
										<td>shrimp</td>
										<td>2 lbs</td>
									</tr>
									<tr className={s["recipe__head-main--ingredients-table-row"]}>
										<td>coriander powder</td>
										<td>1 tsp</td>
									</tr>
									<tr className={s["recipe__head-main--ingredients-table-row"]}>
										<td>ginger garlic paste</td>
										<td>1 tbsp</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div className={s["recipe__head-diff-image-info"]}>
						<div className={s["recipe__head-diff"]}>
							{/* bar, progress bar? */}
						</div>

						<div className={s["recipe__head-image"]}>
							<img src="" alt="" className={s["recipe__head-image-img"]} />
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