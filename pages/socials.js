import Image from 'next/image';
import Head from "next/head";

import s from 'styles/socials.module.scss';

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

const Socials = () => {


    return (
			<div className={s["socials__page"]}>
				<Head>
					<title>Socials</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>

				{/* <Navbar /> */}
				<div className={s["socials"]}>
					<div className={s["socials__main"]}>
						<div className={s["socials__main-links"]}>
							<a
								href="https://mail.google.com"
								target={"_blank"}
								className={s["socials__main-links-email"]}
							>
								<Image src="/Gmail.svg" className={s["socials__main-links-email-img"]} height={50} width={50} /> email
							</a>
							<a
								href="https://facebook.com"
								target={"_blank"}
								className={s["socials__main-links-facebook"]}
							>
								<Image src="/facebook.svg" className={s["socials__main-links-facebook-img"]} height={50} width={50} /> facebook
							</a>
							<a
								href="https://twitter.com"
								target={"_blank"}
								className={s["socials__main-links-twitter"]}
							>
								<Image src="/Twitter_Logo_Blue.svg" className={s["socials__main-links-twitter-img"]} height={50} width={50} /> twitter
							</a>
						</div>
						<div className={s["socials__main-info"]}></div>
					</div>
				</div>


				<Footer className={s["socials__footer"]} />
			</div>
		);
}

export default Socials;