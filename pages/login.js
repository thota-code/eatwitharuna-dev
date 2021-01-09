import { Magic } from 'magic-sdk';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import s from 'styles/login.module.scss';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

import { validateEmail } from 'utilities/authUtil';
import { useUser } from 'utilities/hooks';

const Join = () => {
	useUser({ redirectTo: "/", redirectIfFound: true });
    const [magic, setMagic] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [email, setEmail] = useState('')

	const [step1, setStep1] = useState("login__instr-1-light");
	const [step2, setStep2] = useState("login__instr-2-light");
	const [step3, setStep3] = useState("login__instr-3-light");

	const Router = useRouter();


	const handleForm = e => {
		e.preventDefault();	

		// !e.target.value ? setStep1("login__instr-1-light") : setStep1("login__instr-1-dark");

		if (!e.target.value || !e.target.value.includes('@')) {
			setStep1("login__instr-1-light")
			setStep2("login__instr-2-light")
			setStep3("login__instr-3-light")
		} else {
			setStep1("login__instr-1-dark");
		}
		setEmail(e.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();
		
		if (step1 === 'login__instr-1-light') return;

		setStep2("login__instr-2-dark");
		setStep3("login__instr-3-pending")
		email &&
		validateEmail(email) &&
		handleLoginWithEmail(email);
	}



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

			// console.log(didToken);
			authenticateWithServer(didToken);
		} catch (error) {
			setDisabled(false); // re-enable login button - user may have requested to edit their email
			// console.log(error);
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
			<div className={s["LOGIN"]}>
				<Head>
					<title>Login</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>

				<Navbar className={s["login__navbar"]} />
				<div className={s["login"]}>
					{/* <span className={s["login-text"]}>login/register</span> */}
					<div className={s["login__instr"]}>
						<span className={s[`${step1}`]}>
							sign up or log in with your email
						</span>
						<span className={s[`${step2}`]}>expect a magic link!</span>
						<span className={s[`${step3}`]}>
							open it on any device, and you will be logged in here
						</span>
					</div>

					<div className={s["login__main"]}>
						<span className={s["login__main-instructions"]}>
							register or log in via the link emailed to you!
						</span>

						<form className={s["login__main-form"]}>
							<input
								className={s[`login__main-form--input`]}
								type="email"
								placeholder="please enter your email"
								required
								onChange={(e) => handleForm(e)}
								name="email"
							/>
							<input
								className={s["login__main-form--submit"]}
								type="submit"
								value="➞"
								disabled={disabled}
								onClick={(e) => {
									handleSubmit(e);
								}}
							/>
						</form>
					</div>
				</div>
				<div className={s["login__footer"]}>
					<Footer />
				</div>
			</div>
		);
}

export default Join;