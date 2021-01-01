import s from './Navbar.module.scss';
import Link from 'next/link';

export default function Navbar({ username }) {


    return (
        <>
            <header className={s['nav']}>
                <div className={s['nav__logo']}>
                    <Link href="/">
                    <span className={s['nav__logo-text']}>
                        eat with aruna
                    </span>
                    </Link>
                </div>

                <div className={s['nav__func']}>
                        <Link href="/search">
                            <a className={s['nav__func-search']}>search</a>
                        </Link>
                        <Link href="/recipes">
                            <a className={s['nav__func-recipes']}>recipes</a>
                        </Link>
                        <Link href="/pantry">
                            <a className={s['nav__func-pantry']}>pantry</a>
                        </Link>
                </div>

                <div className={s["nav__social"]}>
                    <Link href="/login"> 
                        <a className={s["nav__social-login"]}>register</a> 
                    </Link>
                    <Link href="/about"> 
                        <a className={s["nav__social-about"]}>about</a> 
                    </Link>
                    <Link href="/socials"> 
                        <a className={s["nav__social-socials"]}>socials</a> 
                    </Link>
                </div>
            </header>
        </>
    )
}