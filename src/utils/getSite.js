const { client } = require('./sanity');


async function getSite() {
    const query = `*[_type == "wsSettings" && !(_id in path("drafts.**"))][0]{ 
        ...,
        footerLinks[]{
            ...,
            _type == 'reference' => {
                "title": @->title,
                "slug": @->slug.current,
            },
        }
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getSite;