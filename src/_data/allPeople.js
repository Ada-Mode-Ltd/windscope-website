const people = require('../utils/getPeople');

module.exports = async function() {
    const data = await people();
    return data;
};