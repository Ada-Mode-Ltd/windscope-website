const { client } = require('./sanity');


async function getQuotes() {
    const query = `*[_type == "quote" && "ws" in publishTo && !(_id in path("drafts.**"))]{ 
        ...,
        'partner': partner->{...},
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getQuotes;