import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import s from './RecipesGrid.module.scss';

import { toHourRound } from 'utilities/util';

// component
// takes in params =>> rows of recipes, any specific categories for queries. 
// can be used as suggested recipes, by using same category as single page recipe
// another option to enable queries to user -> for index page, under featrecipe - before footer / blog
const RecipeTile = React.forwardRef(({ recipe, href, onClick }, ref) => {
	if (!recipe) return (<div className={s["grid__main-tile-empty"]}></div>);

	const { title, totalTime, images, recipeCategory } = recipe;
	
    return (
		<>
			<a ref={ref} href={href} onClick={onClick} className={s["a-Tile"]}>
				<div className={s["grid__main-tile"]}>
					<div className={s["grid__main-tile--image"]}>
						{/* <Image src="/" >{images[0]}</Image> */}
					</div>

					<div className={s["grid__main-tile-info"]}>
						<span className={s["grid__main-tile-info--time"]}>
							o {toHourRound(totalTime.totalHours, totalTime.totalMinutes)}h
							{/* clock svg */}
						</span>

						<span className={s["grid__main-tile-info--category"]}>
							{recipeCategory}
						</span>

						<span className={s["grid__main-tile-info--title"]}>{title}</span>
					</div>
				</div>
			</a>
		</>
	);
});


const RecipesGrid = ({ recipes={}, numRecipes=100, miniForm, mainForm }) => {
    const [currRecipes, setCurrRecipes] = useState(recipes);
	const gridRender = () => {
		const grid = [];

		for (let i = 0; i < numRecipes; i++) {
			let rec = currRecipes[i];

			if (rec) { 
				grid.push (
					<Link href={"/recipe/" + rec.slug.current} passHref key={i}>
						<RecipeTile recipe={rec} />
					</Link>
				)
			} else {
				grid.push (
					<RecipeTile key={i} />
				)
			} 
		};

		// grid.map(tile => {return tile});
		// grid.forEach(tile => {return tile})
		return (
			<>
				{grid.map(tile => {return tile})}
			</>
		)
	};

    return (
			<div className={s["grid"]}>
                {gridRender()}
			</div>
		);
}

export default RecipesGrid;