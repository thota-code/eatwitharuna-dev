import Link from 'next/link';
import Head from 'next/head';

import { getAllRecipes } from 'sanityio/api';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import RecipesGrid from 'components/RecipesGrid/RecipesGrid';

import s from 'styles/recipes.module.scss';

export async function getStaticProps(context) {
    const recipes = await getAllRecipes();

    return {
        props: {
            recipes
        }
    }
};

const Recipes = ({ recipes }) => {


    return (
			<div className={s["recipes"]}>
				<Head>
					<title>EWA: All Recipes</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>

                <Navbar className={s["recipes__nav"]} />

                <main className={s["recipes__main"]}>
                    <RecipesGrid recipes={recipes} numRecipes={12} />
                </main>

                <footer className={s["recipes__footer"]}>
                    <Footer />
                </footer>
			</div>
		);
};

export default Recipes;