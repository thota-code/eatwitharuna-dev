import Link from 'next/link';

import s from 'styles/about.module.scss';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

const About = () => {



    return (
			<div className={s["about__page"]}>
				<Navbar />

				<div className={s["about"]}>
					<div className={s["about__main"]}>
						{/* <span className={s["about__main-ewa"]}>eat with aruna</span>{' '}
					is a recipe / food blog with recipes from Aruna T. this is the demo
					site, designed and developed by Naveen T, and is seeded with test
					data. built with Next.js and Sanity.io, with authentication using
					Magic.link. mehendi svgs from --- check out the code on github. please
					leave any bugs, ideas or feedback here: form input current roadmap: */}

						{/* <span className={s["about__main-ewa"]}>eat with aruna</span> */}
						<div className={s["about__main-intro"]}>
							<span className={s["blue-italic"]}>eat with aruna</span> is a
							recipe / food blog with recipes from{" "}
							<span className={s["green"]}>Aruna T</span>. this is the demo
							site, designed and developed by{" "}
							<span className={s["orange-naveen"]}>
								<a
									className={s["link-naveen"]}
									href={
										"mailto:helloitsnaveen@gmail.com?subject = eatwitharuna - "
									}
									target={"_blank"}
								>
								    Naveen T
								</a>
							</span>
							, and is seeded with test data.
						</div>

						<div className={s["about__main-technologies"]}>
							- built with{" "}
							<span className={s["blue"]}>
								<a
									className={s["link"]}
									href={"https://nextjs.org/"}
									target={"_blank"}
								>
									Next.js
								</a>
							</span>
							,{" "}
							<span className={s["green"]}>
								<a
									className={s["link"]}
									href={"https://www.sanity.io/"}
									target={"_blank"}
								>
									Sanity.io
								</a>
							</span>
							, and authentication with{" "}
							<span className={s["orange"]}>
								<a
									className={s["link"]}
									href={"https://magic.link/"}
									target={"_blank"}
								>
									Magic.link
								</a>
							</span>
							<br />- check out the code on{" "}
							<span className={s["light"]}>
								<a className={s["link-dark"]} href={"#"}>
									Github (soon...)
								</a>
							</span>
							<br />- mehendi designs by{" "}
							<span className={s["blue"]}>
								<a className={s["link"]} href={"https://www.freepik.com/"}>
									GarryKillian / FreePik
								</a>
							</span>{" "}
							{/* <br /> <br />- bugs, feedback, ideas:{" "}
							<span className={s["green"]}>
								<a
									className={s["link"]}
									href={
										"mailto:helloitsnaveen@gmail.com?subject = eatwitharuna - "
									}
									target={"_blank"}
								>
									helloitsnaveen@gmail.com
								</a>
							</span>{" "} */}
							{/* (thank you!) */}
						</div>

						<div className={s["about__main-roadmap"]}>
							<div className={s["about__main-roadmap-left"]}>
								<span className={s["about__main-roadmap-title"]}>
									feature roadmap:{" "}
								</span>{" "}
								<br />
								- multiple recipe images <br />
								- fuzzy main search, through all recipes & steps <br />
								- pantry ingredient lists <br />
								- saved recipes implementation <br />
								- username & comments <br />
							</div>
							<div className={s["about__main-roadmap-right"]}>
								- SSO (w/ Gmail, Facebook, Outlook) <br />
								- difficulty bar for SingleRecipe <br />
								- related recipes under SingleRecipe <br />
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		);
}


export default About;


