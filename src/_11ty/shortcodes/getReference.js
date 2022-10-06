const { client } = require('../../utils/sanity');

async function getReferences(array) {
    const documents = await Promise.all(array.map(async ref => {
        const document = await client.getDocument(ref._ref);
        
        if (document._type === 'quote') {
            const quote = await {
                ...document,
                partner: await client.getDocument(document.partner._ref),
            }

            return {...quote}
        }

        return {...document};
    }));

    return documents;
}

module.exports = getReferences