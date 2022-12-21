const { client } = require('./sanity');


async function getPages() {
    const query = `*[_type == "page" && publishTo == "ws" && !(_id in path("drafts.**"))]{ 
        ...,
        body[]{
            ...,
            _type == "reference" => {
                ...,
            },
            _type == 'blockContent' =>{
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
            },
        _type == 'productFeatures' =>{
            ...,
            features[]->{
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
            }
        },
        _type == 'careers' => {
            ...,
            jobs[]->{
                ...,
            },
        },
        _type == 'people' => {
            ...,
            people[]->{
                ...,
            },
        },
        _type == 'quoteCarousel' => {
            ...,
            quotes[]->{
              ...,
              partner->{
                        ...,
                    },
        }
            }
        },  
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getPages;