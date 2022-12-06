const { client } = require("../../utils/sanity");

module.exports = async function() {
    const query = `*[_type == "post" && "ws" in publishTo] { 
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
    const docs = await client.withConfig({
        token: process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}