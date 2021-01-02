import sanityClient from '@sanity/client';

const options = {
    dataset: process.env.SANITY_DATASET_NAME,
    // dataset: 'production',
    projectId: process.env.SANITY_PROJECT_ID,
    // projectId: '3pjbrhwe',
    useCdn: process.env.NODE_ENV === 'production'
}

export default sanityClient(options);