import Head from 'next/head'
// import styles from 'styles/Home.module.scss'

import Navbar from 'components/Navbar/Navbar';
import FeaturedRecipe from 'components/FeaturedRecipe/FeaturedRecipe';
import Footer from 'components/Footer/Footer';
import SingleRecipe from 'components/SingleRecipe/SingleRecipe';

import { featuredRecipeUtil } from 'utilities/util';

export async function getStaticProps(ctx) {
  let featuredRecipe = await featuredRecipeUtil();
  
  return {
    props: {
      featuredRecipe: featuredRecipe,
    }
  }
}


export default function Home({ featuredRecipe }) {

  return (
    <div className="index">
      <Head>
        <title>Eat with Aruna</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar />

      <main className="main-content">
        <div className="featured-section">
          <FeaturedRecipe fR={featuredRecipe} />
          {/* <FeaturedRecipe /> */}
        </div>

        {/* more stuff */}
      </main>

      <footer className="footer">
        <Footer />
      </footer>

      <SingleRecipe />

    </div>
  )
}
