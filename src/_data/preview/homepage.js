const { client } = require("../../utils/sanity");

module.exports = async function() {
    const query = `*[_type == "wsHomepage"]{ 
        ...,
        "feature": feature->{
            ...,
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
        },
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
    const docs = await client.withConfig({
        token: process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}