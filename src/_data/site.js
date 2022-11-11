const getSite = require('../utils/getSite');

module.exports = async function() {
    const data = await getSite();

    console.log({data})
    return data;
};