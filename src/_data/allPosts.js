const allPosts = require('../utils/getPosts');

module.exports = async function() {
    const data = await allPosts();
    const features = await data.filter(doc => doc.featured);
    const feature = features ? features[0] : null;
    const posts = data.filter(doc => doc._id !== feature?._id);

    // combine feature and posts
    const combined = [feature, ...posts];

    // Get an array of the uniques categories used in each post
    const categories = posts.reduce((acc, post) => {
        post.categories.forEach(cat => {
            if (!acc.includes(cat.title)) {
                acc.push(cat.title);
            }
        });
        return acc;
    }, []);

    return { feature, posts, categories, combined };
};