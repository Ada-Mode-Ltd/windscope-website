const { client } = require('./sanity');


async function getFeatures() {
    const query = `*[_type == "productFeature" && "ws" in product->publishTo && !(_id in path("drafts.**"))]{ 
        ...,
        // TODO: This isn't working!!!
        link{
            ...,
            internalLink{
                ...,
                _type == 'reference' => {
                    "title": @->title,
                    "slug": @->slug.current,
                },
            },
        }
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getFeatures;