const { client } = require('./sanity');


async function getFeatures() {
    const query = `*[_type == "productFeature" && !(_id in path("drafts.**"))]{ 
        ...,
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getFeatures;