import { Magic } from 'magic-sdk';
import { useState, useEffect } from 'react';

import s from 'styles/login.module.scss';
import Navbar from 'components/Navbar/Navbar';

import { validateEmail } from 'utilities/authUtil';
import { useUser } from 'utilities/hooks';

const Join = () => {
	useUser({ redirectTo: "/", redirectIfFound: true });
    const [magic, setMagic] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [email, setEmail] = useState('')


    useEffect(() => {
        !magic &&
            setMagic(
                new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
            );
        magic?.preload();
    }, [magic]);
        
  	async function handleLoginWithEmail(email) {
		try {
			setDisabled(true); // disable login button to prevent multiple emails from being triggered
			let didToken = await magic.auth.loginWithMagicLink({
				email,
				redirectURI: `${process.env.NEXT_PUBLIC_SERVER_URL}/callback`,
			});

			console.log(didToken);
			// authenticateWithServer(didToken);
		} catch (error) {
			setDisabled(false); // re-enable login button - user may have requested to edit their email
			console.log(error);
		}
    }
    
    async function authenticateWithServer(didToken) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + didToken,
            },
        });
        res.status === 200 && Router.push("/");
    }

    return (
			<>
				<Navbar />

				<div className={s["login"]}>
					<span className={s["login-text"]}>login/register</span>
					<div className={s["login__main"]}>
						<span className={s["login__main-instructions"]}>
							register or log in via the link emailed to you!
						</span>

						<form className={s["login__main-form"]}>
							<input
								className={s["login__main-form--input"]}
								type="email"
								placeholder="please enter your email"
								required
								onChange={(e) => setEmail(e.target.value)}
								name="email"
							/>
							<input
								className={s["login__main-form--submit"]}
								type="submit"
								value="➞"
								disabled={disabled}
								onClick={e => {
									e.preventDefault();
									email && validateEmail(email) && handleLoginWithEmail(email);
								}}
							/>
						</form>
					</div>
				</div>
			</>
		);
}

export default Join;