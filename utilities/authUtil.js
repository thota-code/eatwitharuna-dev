import { Magic } from "@magic-sdk/admin";
export const magic = new Magic(process.env.MAGIC_SECRET_KEY);

//

import { serialize } from "cookie";
const TOKEN_NAME = "token";
const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export function setTokenCookie(res, token) {
	const cookie = serialize(TOKEN_NAME, token, {
		maxAge: MAX_AGE,
		expires: new Date(Date.now() + MAX_AGE * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax",
	});
	res.setHeader("Set-Cookie", cookie);
}

export function removeTokenCookie(res) {
	const cookie = serialize(TOKEN_NAME, "", {
		maxAge: -1,
		path: "/",
	});

	res.setHeader("Set-Cookie", cookie);
}

// 


export const validateEmail = email => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};