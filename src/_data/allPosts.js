const allPosts = require('../utils/getPosts');

module.exports = async function() {
    const data = await allPosts();
    const features = await data.filter(doc => doc.featured);
    const feature = features ? features[0] : null;
    const posts = data.filter(doc => doc._id !== feature?._id);
    return { feature, posts };
};