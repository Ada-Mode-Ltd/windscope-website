const { client } = require('./sanity');


async function getCtaPages() {
    const query = `*[_type == "ctaPage" && publishTo == "ws" && !(_id in path("drafts.**"))]{ 
        ...,
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getCtaPages;