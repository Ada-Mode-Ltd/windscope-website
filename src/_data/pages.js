const getPages = require('../utils/getPages');

module.exports = async function() {
    const data = await getPages();
    return data;
};