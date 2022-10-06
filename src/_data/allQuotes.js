const quotes = require('../utils/getQuotes');

module.exports = async function() {
    const data = await quotes();
    return data;
};