# notes

### file system
|== pages
    |== <name>
        |= index.jsx
    |== _app.js
    |== _document.js
    |== index.js
|== styles
    |== globals.scss
    |== <name>.module.scss
|== public
    ...
|== components
    |== Button
        |= index.jsx
        |= button.module.scss

---
todo 

- featRecipe API / getAllFeaturableRecipes => allow params for /snacks only! featRecipe/
- assigned color functions / option in SANITYIO for colors - featured & single 
- api for ingredients to have caloric values
- figure out 'next' featured recipe
- spice in grid form 

dec 31st LEFT - 
MORE RECIPES COMPONENT
    - made, with options 
    - css grid

PANTRY
    - css grid ingredients, add up ingredients and check any recipes
    - visually similar to more recipes, might be reusable

SEARCH 
    - ONLY RECIPES, ingredients section only in pantry (doesn't make sense to search for ingredients)

CSS GRID for INDEX -> footer

REGISTER -
    sanityio schema for users
    authentication
    saved recipes, with user schema

ABOUT - 
    simple write up
    SOCIALS coming soon

IMAGES - 
    squared, sanity asset pipeline image editor
    sanity array of images schema

DIFFICULTY - 
    make css bar of 10steps

LOAD SANITY DATA! 

ART -
    mehendi stock art, placed at edges of pages
    dotted lines
    svg for next featured recipe, 

--- 

division of tasks

JAN 1st - 
    REGISTER / AUTHENTICATION
    SANITYIO USER SCHEMA
    queries to save recipe to user

    ABOUT
    simple write up

    ? -> next feat recipe svg, mehendi
JAN 2nd -
    CSS GRID
    index css grid, sticky footer
    MORE RECIPES COMPONENT

    ? -> mehendi, auth completion (callback, login page css grid)
JAN 3rd -
    SEARCH
    SANITY DATA LOAD 
    DIFFICULTY BAR 

    ? -> PANTRY, IMAGES
JAN 4th -
    PANTRY
    HOSTING
    RESUME 
    a/A

    'COMPLETED'

--- 

regrouping on JAN 5th! 

remainders - 
    SANITYIO USER SCHEMA 
    SAVED RECIPES 
    AUTH CALLBACK
        - 
    MEHENDI CSS 
    SVGS & ICONS (inc. DOTTED LINES)
    DEMO (NAVBAR LOGO)
        - 
    FUZZY JSON SEARCH (NAVBAR) 
    SEARCH (NAVBAR) MODAL / STYLING 
    SEARCH / FILTER (RECIPES) LOGIC
        - 
    PANTRY
        - 
    COMPLETION OF AUX PAGES (SOCIALS, ABOUT)
    FOOTER LINKS
        -
    AUTO IMAGE PIPELINE SANITYIO
    SANITYIO DATA LOAD - RECIPES + INGREDIENTS + ETC


AuxWork
    <!-- Mehendi -->
    <!-- SVG & ICONS  -->
    <!-- Demo Logo -->
    <!-- Footer Links -->
    <!-- Login page sizing + footer fixes -->

AuxWork (cont.)
    Blog Divs
    Index MoreRecipes Comp
    -
    Sanity Image Pipeline
    MoreRecipes Comp following SingleRecipe
    cont. Mehendi / diff one on [recipe].js
    Aux Pages (social / about)
    getStaticProps for recipes.js
    AUTH Callback
    figure out colors for featrec
    FIX !!!! mehendi for FeatRec. Maybe put it in flexbox of details + next, and use that to always be aligned. Position ABSOLUTE BADDDD
    dotted line under featrec
    USE SECOND RECIPES IMAGE IN SINGLEREC
    add category as prop to RecipesGrid, for bottom of singlerecipe (category +)
