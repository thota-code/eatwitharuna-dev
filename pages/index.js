import Head from 'next/head';
import Link from 'next/link';

import Navbar from 'components/Navbar/Navbar';
import FeaturedRecipe from 'components/FeaturedRecipe/FeaturedRecipe';
import Footer from 'components/Footer/Footer';
import SingleRecipe from 'components/SingleRecipeCard/SingleRecipeCard';

import { featuredRecipeUtil } from 'utilities/util';

export async function getStaticProps(ctx) {
  let featuredRecipe = await featuredRecipeUtil();
  
  return {
    props: {
      featuredRecipe,
    }
  }
}


export default function Home({ featuredRecipe }) {
  const recipeHref = '/recipe/' + featuredRecipe.slug.current;

  return (
    <div className="index">
      <Head>
        <title>Eat with Aruna</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar />

      <main className="main-content">
        <div className="featured-section">
          <Link href={recipeHref} passHref>
              <FeaturedRecipe fR={featuredRecipe} />
          </Link>
        </div>

      </main>

      <footer className="footer">
        <Footer />
      </footer>



    </div>
  )
}
