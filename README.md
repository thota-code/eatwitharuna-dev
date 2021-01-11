<h1 align='center'>- eat with aruna -</h1>
<!-- ### recipes, blogs and more from ___Aruna T___. -->

<div align="center">
    :plate_with_cutlery:
</div>
<div align="center">
    <a href="https://eatwitharuna-dev.vercel.app/" /> [current demo] </a>
</div>
<div align="center">
  <strong>a recipe blog, from <code>Aruna T.</code></strong>
</div>

<div align="center">
  <sub>Built with ❤︎ by
  <a href="https://www.linkedin.com/in/helloitsnaveen/">Naveen T</a> 
</div>

<br />


## Table of Contents:
- [Features / Usage](#Features)
- [Images](#Images)
- [Technologies](#Technologies)
    - [Motivations](#Motivations)
    - [Stack](#Stack)
    - [Recipe Schema](#Schema)
- [Future](#Future)

![main](images/Main.png)

<br />


---
## Features
### ___General___
- ___Navbar___, with search modal and links to the recipes, pantry, login, about and socials pages. Once logged in, allows user to access saved recipes, and logout.
- ___Footer___, with links to home, recipes, about, contact and GitHub repo pages.
- __Search__, launched from Navbar - opens modal with search input, with results rendered as individual search tiles. 

### ___Home Page___
- ___Featured Recipe Tile___, automatically rotates through 'featurable' recipes, with a 'Next' button to change manually. Includes [recipe info](#schema) => main Image, summary & byline, three recipe tags(suitableForDiet, recipeHeft, recipeHealth), and prep info (recipeYield, numIngredients, totalTime)

- ___Featured Recipe Grid___, a recipe grid of only 'featurable' recipes, will be randomized. Includes totalTime, recipeCategory, title and a link to the recipes page.

- ___Blog___, upcoming - will feature a random blog.

### ___Recipes Page___
- ___Grid Form___, with search bar, sorting options, filter options and a form reset. Results of the form are rendered in the Recipe Grid below. Statically rendered, with a single all recipes fetch and sorting through the result. Information and links to Navbar search and pantry on right.
- ___Grid___, renders results of Form, default being all recipes. Extends based on number of recipes, with empty tiles rendered with border only. Each tile holds main Image, totalTime, recipeCategory and title.

### ___Pantry___
- upcoming - allow users to build list of owned ingredients, and returns all matching recipes.

### ___Join___
- allows user to sign up / log in using a single email link. 
- live validation of email, and link on left. Magic modal is opened upon email submit, and user is rerendered to Home page (Magic link can be opened from any device).

### ___About___
- Basic site information, with future features roadmap

### ___Social___
- Social links - Email, Facebook, Twitter
<br />

---
## Images 


<br />

---

## Technologies 

### ___Motivations___
When beginning the project, I had a few core motivations that dictated the tech stack, features and design. 
- Stylized and eye-catching design, but with a very obvious & linear layout for easy navigation.
- Simplified CMS for ease of access for my mom (Aruna T) to add and remove ingredients, recipes and blogs. No tech knowledge should be necessary to organize content on the page, with all logic abstracted and hidden. 
- Minimal data-fetching, ideally fully static pages for quick load times and seamless navigation. Not a very data-intensive website, minimize API calls. 

### ___Stack___
- ___[Next.js](next.js.org)___: Utilized SSR on all pages (except login, SSG for authentication API requests), for near instantaneous page loads. Index page and recipes make a single `getAllRecipes` Sanity API request in their `getStaticProps` methods, with all further data manipulation done client side. `_app.js` used for site-global navbar and footer, CSS Modules used for all page and component styling.
- ___Sanity.io___ used as headless CMS, with `Sanity Studio` used  to add ingredients, recipes and blogs. `Studio` is a fully customizable React app, with a very simple interface to manage data - adding content simply through forms. Schema for recipes and ingredients set up, with `GROQ` queries to fetch from Sanity API.
- ___[Magic.link](magic.link)___ for a simple, passwordless authentication cycle. Stores JWT Token for extended sessions.

### ___Recipe Schema___
<br />

---
## Future
### Feature Roadmap


<!-- ![index](images/Index.jpeg) -->


