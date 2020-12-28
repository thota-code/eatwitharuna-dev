import Head from 'next/head'
// import styles from 'styles/Home.module.scss'

import Navbar from '../components/Navbar/Navbar';
import FeaturedRecipe from '../components/FeaturedRecipe/FeaturedRecipe';

export default function Home() {
  return (
    <>
      <Head>
        <title>Eat with Aruna</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar />
      
      <div className="featured-section">
        <FeaturedRecipe />
      </div>
    </>
  )
}
