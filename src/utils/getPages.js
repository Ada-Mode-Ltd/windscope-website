const { client } = require('./sanity');


async function getPages() {
    const query = `*[_type == "page" && publishTo == "ws" && !(_id in path("drafts.**"))]{ 
        ...,
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getPages;