const { client } = require('./sanity');


async function getPeople() {
    const query = `*[_type == "person" && "ws" in publishTo && !(_id in path("drafts.**"))]{ 
        ...,
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getPeople;