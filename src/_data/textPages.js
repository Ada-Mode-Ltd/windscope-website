const getTextPages = require('../utils/getTextPages');

module.exports = async function() {
    const data = await getTextPages();
    return data;
};