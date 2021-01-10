import s from './Navbar.module.scss';
import Link from 'next/link';
import { useState } from 'react';

import { useUser } from 'utilities/hooks';

import SearchModal from 'components/SearchModal/SearchModal';

export default function Navbar({ username, featRec, openState, handleOpen, handleClose }) {
    const user = useUser();
    // const [open, setOpen] = useState(false);

    // const handleClose = e => {
    //     e.preventDefault();
    //     setOpen(false);
    // };


    const loggedInJoin = () => {
        return user ? (
					<>
						<Link href="/">
							<a className={s["nav__social-saved"]}>saved</a>
						</Link>
						<Link href="/api/auth/logout">
							<a className={s["nav__social-logout"]}>logout</a>
						</Link>
					</>
				) : (
					<Link href="/login">
						<a className={s["nav__social-login"]}>join</a>
					</Link>
				);
    };

    return (
			<>
				<header className={s["nav"]}>
					<div className={s["nav__logo"]}>
						<a href="/about" className={s["nav__logo-demo"]}>
							demo!
						</a>
						<Link href="/">
							<span className={s["nav__logo-text"]}>eat with aruna</span>
						</Link>
					</div>

					<div className={s["nav__func"]}>
						{/* <Link href="/search"> */}
							<div
                                // onClick={(e) => setOpen(true)}
                                onClick={e => handleOpen(e)}
								className={s["nav__func-search"]}
							>
								search
							</div>
                            {openState && <SearchModal data={featRec} handleClose={handleClose} />}
                            {/* {open && console.log('uye')} */}
						{/* </Link> */}
						<Link href="/recipes">
							<a className={s["nav__func-recipes"]}>recipes</a>
						</Link>
						<Link href="/pantry">
							<a className={s["nav__func-pantry"]}>pantry</a>
						</Link>
					</div>

					<div className={s["nav__social"]}>
						{loggedInJoin()}
						<Link href="/about">
							<a className={s["nav__social-about"]}>about</a>
						</Link>
						<Link href="/socials">
							<a className={s["nav__social-socials"]}>socials</a>
						</Link>
					</div>
				</header>

				{/* <SearchModal data={featRec} /> */}
				<div id="modal" />
			</>
		);
}