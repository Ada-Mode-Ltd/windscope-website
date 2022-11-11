const getSite = require('../utils/getSite');

module.exports = async function() {
    const data = await getSite();
    return data;
};