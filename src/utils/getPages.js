const { client } = require('./sanity');
const isServerless = process.env.ELEVENTY_SERVERLESS || false

const buildConstraint =
  !isServerless
    ? `&& !(_id in path("drafts.**"))`
    : `&& (_id in path("drafts.**"))`


async function getPages() {
    const query = `*[_type == "page" && publishTo == "ws" ${buildConstraint}]{ 
        ...,
        body[]{
            ...,
            _type == "reference" => {
                ...,
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
    const docs = await client.withConfig({
        token: isServerless && process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}

module.exports = getPages;