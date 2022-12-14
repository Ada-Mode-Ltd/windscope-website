const { client } = require('./sanity');

async function getPosts() {
    const query = `*[_type == "post" && "ws" in publishTo && !(_id in path("drafts.**"))] | order(publishedAt desc){ 
        ...,
        "description": coalesce(description, blurb),
        "categories": categories[]->{...},
        "author": author->{...},
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

module.exports = getPosts;