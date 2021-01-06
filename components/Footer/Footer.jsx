import s from './Footer.module.scss';

import Image from 'next/image';
import Link from 'next/link'

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
								<Link href="/">
									<a className={s["footer__main-links--pages-home"]}>
										home
									</a>
								</Link>
								<Link href="/recipes">
									<a className={s["footer__main-links--pages-recipes"]}>
										all recipes
									</a>
								</Link>
							</div>

							<div className={s["footer__main-links--more"]}>
								<Link href="/about">
									<a className={s["footer__main-links--more-about"]}>
										about us
									</a>
								</Link>
								<Link href="/contact">
									<a className={s["footer__main-links--more-contact"]}>
										contact/mail
									</a>
								</Link>

								<Link href="/">
									<a className={s["footer__main-links--more-code"]}>
										code on github
									</a>
								</Link>
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