const getHomepage = require('../utils/getHomepage');

module.exports = async function() {
    const data = await getHomepage();
    return data;
};