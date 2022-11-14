const { client } = require('./sanity');


async function getHomepage() {
    const query = `*[_type == "wsHomepage" && !(_id in path("drafts.**"))][0]{ 
        ...,
        "feature": feature->{...},
        "quotes": quotes[]->{..., partner->{...}},
        tabs{
            ...,
            sectionLink{
                ...,
                internalLink{
                    ...,
                    _type == 'reference' => {
                        "title": @->title,
                        "slug": @->slug.current,
                    },
                },
            }, 
        },
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getHomepage;