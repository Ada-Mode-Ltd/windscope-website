const features = require('../utils/getFeatures');

module.exports = async function() {
    const data = await features();
    // Separate large, medium and small filter types
    const large = data.filter(feature => feature.featureType === 'large');
    const medium = data.filter(feature => feature.featureType === 'medium');
    const small = data.filter(feature => feature.featureType === 'small');

    return {
        large,
        medium,
        small,
        };
};