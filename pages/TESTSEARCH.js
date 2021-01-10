import SearchModal from "components/SearchModal/SearchModal";

import { getAllRecipes } from 'sanityio/api';

export async function getStaticProps(context) {
    const recipes = await getAllRecipes();

    return {
        props: {
            recipes
        },
    }
};

const TESTSEARCH = ({ recipes }) => {


    return (
        <>
            <div id="modal"> 
                <SearchModal data={recipes} />
            </div>
        </>
    )
};

export default TESTSEARCH;