const { client } = require('./sanity');


async function getPeople() {
    const query = `*[_type == "job" && "ws" in publishTo && open && !(_id in path("drafts.**"))]{ 
        ...,
        body{
            ...,
            content[]{
                ...,
                markDefs[] {
                  ...,
                  _type == "internalLink" => {
                    ...,
                    "slug": @.reference-> slug
                  }
                }
            }
          } 
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getPeople;