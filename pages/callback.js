import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import Router, { useRouter } from "next/router";

const Callback = () => {
	const [magic, setMagic] = useState(null);
	const [errorMsg, setErrorMsg] = useState("");
	const [showValidatingToken, setShowValidatingToken] = useState(false);
	const router = useRouter();

	useEffect(() => {
		!magic &&
			setMagic(
				new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
			);
		finishEmailRedirectLogin();
	}, [magic, router.query]);

	const finishEmailRedirectLogin = async () => {
		if (router.query.magic_credential) {
			try {
				let didToken = await magic.auth.loginWithCredential();
				setShowValidatingToken(true);
				await authenticateWithServer(didToken);
			} catch (error) {
				console.log(error);
				setErrorMsg("Error logging in. Please try again.");
			}
		}
	};

	const authenticateWithServer = async (didToken) => {
		let res = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + didToken,
			},
		});
		res.status === 200 && Router.push("/");
	};

	return (
        <h2>one sec.</h2>
	);
};

export default Callback;
