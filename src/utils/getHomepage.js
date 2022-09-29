const { client } = require('./sanity');


async function getHomepage() {
    const query = `*[_type == "wsHomepage" && !(_id in path("drafts.**"))][0]{ 
        ...,
        "feature": feature->{...},
        "quotes": quotes[]->{..., partner->{...}},
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getHomepage;