import { useState } from 'react';

import s from './FeaturedRecipe.module.scss';

export default function FeaturedRecipe({ fR }) {
    //
    // title, summary_main, summary_byline, image_main, totalTime, recipeYield, numIngredients, recipeCategory, suitableForDiet, recipeHeft
    // 
    // const [title, setTitle] = useState();
    // const [summaryMain, setSummaryMain] = useState();
    // const [summaryByline, setSummaryByline] = useState();
    // const [imageMain, setImageMain] = useState();
    // const [totalTime, setTotalTime] = useState();
    // const [recipeYield, setRecipeYield] = useState();
    // const [numIngredients, setNumIngredients] = useState();
    // const [recipeCategory, setRecipeCategory] = useState();
    // const [suitableForDiet, setSuitableForDiet] = useState();
    // const [recipeHeft, setRecipeHeft] = useState();

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
                    totalTime: fR.totalTime.totalHours, 
                    recipeYield: fR.recipeYield,
                    numIngredients: fR.numIngredients,
                    recipeCategory: fR.recipeCategory[0],
                    suitableForDiet: fR.suitableForDiet[0],
                    recipeHeft: fR.recipeHeft[0],
			  }
			: loadingState;

    const [featRec, setFeatRec] = useState(featRecipeState);

    return (
        <>
            {console.log(featRec)}
            <div className={s["featured"]}>
                <div className={s["featured__visual-div"]} />
                <div className={s["featured__tags"]}>
                    <span className={s["featured__tags--1"]}></span>
                    <span className={s["featured__tags--2"]}></span>
                    <span className={s["featured__tags--3"]}></span>
                </div>

                <div className={s["featured__image"]}>
                    <img src="" alt="" className={s["featured__image-img"]}/>
                </div>

                <div className={s["featured__title-desc"]}>

                    <div className={s["featured__title"]}>
                        <span className={s["featured__title-text"]}>
                            chicken dum <span className={s['featured__title-text--last']}>biryani</span>
                        </span>
                    </div>

                    <div className={s["featured__desc"]}>
                        <span className={s["featured__desc--main"]}>
                            homemade plate of fragrant spices, aromatic fluffy rice, fried onions and marinated meat. 
                        </span>
                        <span className={s["featured__desc--byline"]}>
                            a true labor of love.
                        </span>
                    </div>

                </div>


                <div className={s["featured__next"]}>
                    <span className={s["featured__next-text"]}>next ></span>
                    {/* svg here */}
                </div>
   
                <div className={s["featured__info"]}>
                    <div className={s["featured__info-serves"]}>
                        <span className={s["featured__info-serves--text"]}>serves:</span>
                        <span className={s["featured__info-serves--num"]}>4</span>
                    </div>

                    <div className={s["featured__info-ing"]}>
                        <span className={s["featured__info-ing--text"]}>ingredients:</span>
                        <span className={s["featured__info-ing--num"]}>13</span>
                    </div>

                    <div className={s["featured__info-time"]}>
                        <span className={s["featured__info-time--text"]}>time/h:</span>
                        <span className={s["featured__info-time--num"]}>3</span>
                    </div>
                </div>

            </div>
        </>
    )
}
