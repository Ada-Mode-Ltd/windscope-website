const getCtaPages = require('../utils/getCtaPages');

module.exports = async function() {
    const data = await getCtaPages();
    return data;
};