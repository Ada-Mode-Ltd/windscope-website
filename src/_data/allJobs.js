const jobs = require('../utils/getJobs');

module.exports = async function() {
    const data = await jobs();
    return data;
};