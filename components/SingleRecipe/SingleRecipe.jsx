import s from './SingleRecipe.module.scss';

export default function SingleRecipe() {
    // HARDCODED!
    // title, tags, ingredients table, info

    // must receive color!


    return (
        <div className={s["recipe"]}>
            <div className={s["recipe__head"]}>
                <div className={s["recipe__head-title-tagsline"]}>
                    <div className={s["recipe__head-title"]}>big yum shrimp curry</div>
                    <div className={s["recipe__head-tagsline"]}>meal · heavy · non-veg</div>
                </div>

                <div className={s["recipe__head-main"]}>
                    <div className={s["recipe__head-main--ingredients"]}>
                        <span className={s["recipe__head-main--ingredients-title"]}>ingredients</span>

                        <table className={s["recipe__head-main--ingredients-table"]}>
                            <tbody>
                                <tr className={s["recipe__head-main--ingredients-table-row"]}>
                                    <td></td>&nbsp;
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
                        <img src="" alt="" className={s["recipe__head-image-img"]}/>
                    </div>

                    <div className={s["recipe__head-info"]}>
                        <div className={s["recipe__head-info-time-serves"]}>
                            <div className={s["recipe__head-info--total"]}>
                                <span className={s["recipe__head-info--total-text"]}>
                                    total time: <span className="recipe__head-info--total-num">3hr</span>
                                </span>
                            </div>
                            <div className={s["recipe__head-info--serves"]}>
                                <span className={s["recipe__head-info--serves-text"]}>
                                    serves: <span className="recipe__head-info--serves-num">4</span>
                                </span>
                            </div>
                        </div>

                        <div className={s["recipe__head-info-prep-cook"]}>
                            <div className={s["recipe__head-info--prep"]}>
                                <span className={s["recipe__head-info--prep-text"]}>
                                    prep time: <span className="recipe__head-info--prep-num">1hr 15min</span>
                                </span>
                            </div>
                            <div className={s["recipe__head-info--cook"]}>
                                <span className={s["recipe__head-info--cook-text"]}>
                                    cook time: <span className="recipe__head-info--cook-num">45m</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* actual steps go here */}
        </div>
    )
}