import Image from 'next/image';

import s from 'styles/socials.module.scss';

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

const Socials = () => {


    return (
			<div className={s["socials__page"]}>
				<Navbar />

				<div className={s["socials"]}>
					<div className={s["socials__main"]}>
						<div className={s["socials__main-links"]}>
							<a href="https://mail.google.com" target={"_blank"} className={s["socials__main-links-email"]}>
								<Image src="/Gmail.svg" height={50} width={50} /> email
							</a>
							<a href="https://facebook.com" target={"_blank"} className={s["socials__main-links-facebook"]}>
								<Image src="/facebook.svg" height={50} width={50} /> facebook
							</a>
							<a href="https://twitter.com" target={"_blank"} className={s["socials__main-links-twitter"]}>
								<Image src="/Twitter_Logo_Blue.svg" height={50} width={50} /> twitter
							</a>
						</div>
						<div className={s["socials__main-info"]}></div>
					</div>
				</div>

				<Footer />
			</div>
		);
}

export default Socials;