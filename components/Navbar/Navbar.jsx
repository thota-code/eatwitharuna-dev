import s from './Navbar.module.scss';

export default function Navbar({ username }) {


    return (
        <>
            <header className={s['nav']}>
                <div className={s['nav__logo']}>
                    <span className={s['nav__logo-text']}>
                        eat with aruna
                    </span>
                </div>

                <div className={s['nav__func']}>
                    <span className={s['nav__func--search']}>search</span>
                    <span className={s['nav__func--recipes']}>recipes</span>
                    <span className={s['nav__func--pantry']}>pantry</span>
                </div>

                <div className={s["nav__social"]}>
                    <span className={s["nav__social--login"]}>register</span>
                    <span className={s["nav__social--about"]}>about</span>
                    <span className={s["nav__social--socials"]}>socials</span>
                </div>
            </header>
        </>
    )
}