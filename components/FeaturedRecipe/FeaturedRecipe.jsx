import React, { useState } from 'react';

import s from './FeaturedRecipe.module.scss';
import { featuredRecipeUtil, toHourRound } from "utilities/util";

import Image from "next/image";

const FeaturedRecipe = React.forwardRef(({ fR, href }, ref) => {
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

    const featRecipeState = fR
			? {
					title: fR.title,
					summaryMain: fR.summary.summary_main,
					summaryByline: fR.summary.summary_byline,
					imageMain: fR.images.image_main,
					totalTime: toHourRound(
						fR.totalTime.totalHours,
						fR.totalTime.totalMinutes
					),
					recipeYield: fR.recipeYield,
					numIngredients: fR.numIngredients,
					recipeCategory: fR.recipeCategory[0],
					suitableForDiet: fR.suitableForDiet[0],
					recipeHeft: fR.recipeHeft[0],
			  }
			: null;
	
	const [featRec, setFeatRec] = useState(featRecipeState ? featRecipeState : loadingState);
	const title = featRec.title;
	// not a fan of this ^ implementation

    function titleLastCap() {
        const splitTitle = title.split(' ');
        return (
            <>
                {splitTitle.slice(0, -1).join(' ')}
                <span className={s['featured__title-text--last']}> {splitTitle.slice(-1).pop()}</span>
            </> 
        )
	}
	

    return (
			<a ref={ref} href={href} className={s["a-Featured"]}>
				<div className={s["featured"]}>
					<div className={s["featured__visual-div"]} />
					<div className={s["featured__tags"]}>
						<span className={s["featured__tags--diet"]}>
							{featRec.suitableForDiet},
						</span>
						<span className={s["featured__tags--heft"]}>
							{featRec.recipeHeft},
						</span>
						<span className={s["featured__tags--category"]}>
							{featRec.recipeCategory}
						</span>
					</div>

					<div className={s["featured__image"]}>
						<img src="" alt="" className={s["featured__image-img"]} />
					</div>

					<div className={s["featured__title-desc"]}>
						<div className={s["featured__title"]}>
							<span className={s["featured__title-text"]}>
								{/* chicken dum <span className={s['featured__title-text--last']}>biryani</span> */}
								{titleLastCap()}
							</span>
						</div>

						<div className={s["featured__desc"]}>
							<span className={s["featured__desc--main"]}>
								{featRec.summaryMain}
							</span>
							<span className={s["featured__desc--byline"]}>
								{featRec.summaryByline}
							</span>
						</div>
					</div>

					<div className={s["featured__info"]}>
						<div className={s["featured__next"]}>
							<span className={s["featured__next-text"]}>
								next →
							</span>
							{/* svg here */}
						</div>

						<div className={s["featured__info-serves"]}>
							<span className={s["featured__info-serves--text"]}>serves:</span>
							<span className={s["featured__info-serves--num"]}>
								{featRec.recipeYield}
							</span>
						</div>

						<div className={s["featured__info-ing"]}>
							<span className={s["featured__info-ing--text"]}>
								ingredients:
							</span>
							<span className={s["featured__info-ing--num"]}>
								{featRec.numIngredients}
							</span>
						</div>

						<div className={s["featured__info-time"]}>
							<span className={s["featured__info-time--text"]}>time/h:</span>
							<span className={s["featured__info-time--num"]}>
								{featRec.totalTime}
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
			</a>
		);
});

export default FeaturedRecipe;