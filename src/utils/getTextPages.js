const { client } = require('./sanity');


async function getTextPage() {
    const query = `*[_type == "generalPage" && publishTo == "ws" && !(_id in path("drafts.**"))]{ 
        ...,
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getTextPage;