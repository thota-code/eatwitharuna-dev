import React, { useState } from 'react';

import { useEffect } from 'react';

import s from './FeaturedRecipe.module.scss';
import { featuredRecipeUtil, toHourRound, generateRandomInteger } from "utilities/util";

import Image from "next/image";
import Link from 'next/link';

const FeaturedRecipe = ({ recipes }) => {
	// all recipes
	// set fR to current recipe
	// change fR upon 'next' button click
	
	// const [randIdx, setRandIdx] = useState(generateRandomInteger(0, 3));
	const [idx, setIdx] = useState(0);
	const [fR, setFR] = useState(recipes[idx]);
	const length = recipes.length;
	let nextIdx = idx + 1;


	useEffect(() => {
		setFR(recipes[idx]);
	}, [idx])

	const nextHandler = e => {
		if (idx+1 === length) { setIdx(0); return; };
		setIdx(nextIdx);
	};
	
	const loadingState = {
		title: '',
        summaryMain: '',
        summaryByline: 'One second...', 
        imageMain: '', 
        totalTime: '', 
        recipeYield: '', 
        numIngredients: '', 
        recipeCategory: '', 
        suitableForDiet: '',
        recipeHeft: '',
	};
	
	// const nextFeatHandler = e => {
	// 	// e.preventDefault();
	// 	newRec();
	// }

    function titleLastCap() {
        const splitTitle = fR.title.split(' ');
        return (
            <>
                {splitTitle.slice(0, -1).join(' ')}
                <span className={s['featured__title-text--last']}> {splitTitle.slice(-1).pop()}</span>
            </> 
        )
	}
	
	// console.log(fR.mainImageUrl + '?h=350&w=350')

    return (
			<div className={s["featured"]}>
				{/* <div className={s["featured__visual-div"]} /> */}
				<div className={s["featured__tags"]}>
					<span className={s["featured__tags--diet"]}>
						{fR.suitableForDiet},
					</span>
					<span className={s["featured__tags--heft"]}>{fR.recipeHeft},</span>
					<span className={s["featured__tags--category"]}>
						{fR.recipeCategory}
					</span>
				</div>

				<Link href={`/recipe/${fR.slug.current}`} className={s["a-Featured"]}>
					<div className={s["featured__image"]}>
						<img src={fR.mainImageUrl + '?h=500&w=500'} alt="" className={s["featured__image-img"]} />
					</div>
				</Link>

				<div className={s["featured__title-desc"]}>
					<div className={s["featured__title"]}>
						<span className={s["featured__title-text"]}>
							{/* chicken dum <span className={s['featured__title-text--last']}>biryani</span> */}
							{titleLastCap()}
						</span>
					</div>

					<div className={s["featured__desc"]}>
						<span className={s["featured__desc--main"]}>
							{fR.summary.summary_main}
						</span>
						<span className={s["featured__desc--byline"]}>
							{fR.summary.summary_byline}
						</span>
					</div>
				</div>

				<div className={s["featured__info"]}>
					<div className={s["featured__next"]}>
						<span
							className={s["featured__next-text"]}
							onClick={(e) => nextHandler(e)}
						>
							next →
						</span>
						{/* svg here */}
					</div>

					<div className={s["featured__info-serves"]}>
						<span className={s["featured__info-serves--text"]}>serves:</span>
						<span className={s["featured__info-serves--num"]}>
							{fR.recipeYield}
						</span>
					</div>

					<div className={s["featured__info-ing"]}>
						<span className={s["featured__info-ing--text"]}>ingredients:</span>
						<span className={s["featured__info-ing--num"]}>
							{fR.numIngredients}
						</span>
					</div>

					<div className={s["featured__info-time"]}>
						<span className={s["featured__info-time--text"]}>time/h:</span>
						<span className={s["featured__info-time--num"]}>
							{toHourRound(fR.totalTime.totalHours)}
						</span>
					</div>
				</div>

				<div className={s["featured__Mlarge"]}>
					<Image
						src="/MLarge.svg"
						className={s["featured__Mlarge-img"]}
						height={270}
						width={270}
					/>
				</div>
			</div>
			// </Link>
		);
};

export default FeaturedRecipe;