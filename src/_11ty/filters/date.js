const dayjs = require('dayjs')

const w3cDate = (value) => {
    const dateObject = new Date(value);
    	return dateObject.toISOString();
}

const dateFormat = (value) => {
    return dayjs(value).format('MMMM DD, YYYY')
}

module.exports = {
    w3cDate,
    dateFormat
}
