import Head from 'next/head';
import Link from 'next/link';

import Navbar from 'components/Navbar/Navbar';
import FeaturedRecipe from 'components/FeaturedRecipe/FeaturedRecipe';
import Footer from 'components/Footer/Footer';
import SingleRecipe from 'components/SingleRecipeCard/SingleRecipeCard';

import s from 'styles/index.module.scss';

import { featuredRecipeUtil } from 'utilities/util';

export async function getStaticProps(ctx) {
  let featuredRecipe = await featuredRecipeUtil();
  
  return {
    props: {
      featuredRecipe,
    },
    revalidate: 40,
  }
}


export default function Home({ featuredRecipe }) {
  const recipeHref = '/recipe/' + featuredRecipe.slug.current;

  return (
    <div className={s["index"]}>
      <Head>
        <title>Eat with Aruna</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar className={s["index__nav"]}/>

      <main className={s["index__main"]}>
        <div className="featured-section">
          <Link href={recipeHref} passHref>
              <FeaturedRecipe fR={featuredRecipe} />
          </Link>
          <Link href={recipeHref} passHref>
              <FeaturedRecipe fR={featuredRecipe} />
          </Link>
          <Link href={recipeHref} passHref>
              <FeaturedRecipe fR={featuredRecipe} />
          </Link>

        </div>


      </main>

      <footer className={s["index__footer"]}>
        <Footer />
      </footer>
    </div>
  )
}
