const { client } = require("../../utils/sanity");

module.exports = async function() {
    const query = `*[_type == "productFeature"] { 
        ...
     }`
    const docs = await client.withConfig({
        token: process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}