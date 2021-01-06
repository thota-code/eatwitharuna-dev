import s from './Footer.module.scss';

import Image from 'next/image';

export default function Footer() {


    return (
			<>
				<div className={s["footer"]}>
					<div className={s["footer__main"]}>
						<div className={s["footer__main-logo"]}>
							<span className={s["footer__logo-text"]}>eat with aruna</span>
						</div>

						<div className={s["footer__main-links"]}>
							<div className={s["footer__main-links--pages"]}>
								<a href="#" className={s["footer__main-links--pages-home"]}>
									home
								</a>
								<a href="#" className={s["footer__main-links--pages-recipes"]}>
									all recipes
								</a>
							</div>

							<div className={s["footer__main-links--more"]}>
								<a href="#" className={s["footer__main-links--more-about"]}>
									about us
								</a>
								<a href="#" className={s["footer__main-links--more-contact"]}>
									contact/mail
								</a>
								<a href="#" className={s["footer__main-links--more-code"]}>
									code on github
								</a>
							</div>
						</div>
					</div>
					<div className={s["footer__Mlarge"]}>
						<Image
							src="/MLarge.svg"
							className={s["footer__Mlarge-img"]}
							height={300}
							width={300}
						/>
					</div>
				</div>
			</>
		);
}