import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

import { toHourRound } from 'utilities/util';
import ClientOnlyPortal from "./ClientOnlyPortal";

import s from './SearchModal.module.scss';

// open on search click
// close on button, appears when search is empty
// fusejs

const ResultTile = ({ recipe }) => {
    const { title, totalTime, recipeCategory } = recipe;

    return (
        <>
            {/* <a ref={ref} href={href} onClick={onClick} className={s["tile"]}> */}
            <a className={s["tile"]}>
                <div className={s["tile__main"]}>
                    <div className={s["tile__main-image"]}>
                        <img
                            src={recipe.mainImageUrl + "?h=500&w=500"}
                            alt=""
                            className={s["tile__main-image--img"]}
                        />
                    </div>

                    <div className={s["tile__main-info"]}>
                        <span className={s["title__main-info--title"]}>{title}</span>

                        <span className={s["tile__main-info--category"]}>
                            {recipeCategory}
                        </span>
                        
                        <span className={s["tile__main-info--time"]}>
                            o {toHourRound(totalTime.totalHours, totalTime.totalMinutes)}h
                            {/* clock svg */}
                        </span>


                    </div>
                </div>
            </a>
        </>
    );
};

const SearchModal = ({ data, handleClose }) => {
    const [userSearch, setUserSearch] = useState('');
    // const [open, setOpen] = useState();


    const options = {
        includeScore: true,
        keys: [
            {
                name: 'title',
                weight: 1
            }
        ]
    };

    const fuse = new Fuse(data, options);
    const result = fuse.search(userSearch);

    // <input type="search" value={userSearch} onChange={e => setUserSearch(e.target.value)}/>
    // {result.map(res => {return res.item.title})} 

    return (
			<div className="main">
				{/* <button type="button" onClick={() => setOpen(true)}>
					Open Modal
				</button> */}
				{/* {open && ( */}
					<ClientOnlyPortal selector="#modal">
						<div className={s["backdrop"]}>
							<div className={s["search"]}>
								<div className={s["search__input"]}>
									<input
										type="search"
										value={userSearch}
										onChange={(e) => setUserSearch(e.target.value)}
										className={s["search__input-input"]}
										placeholder={"search!"}
									/>

									<button
										type="button"
                                        onClick={e => handleClose(e)}
										className={s["search__input-close"]}
									>
										<span>✕</span>
									</button>
								</div>

								<div className={s["search__results"]}>
									{result && result.map((res) => (
										<ResultTile recipe={res.item} />
									))}
								</div>
							</div>
						</div>
					</ClientOnlyPortal>
				{/* )} */}
			</div>
		);
};

export default SearchModal;