const { client } = require('./sanity');

const checkDoc = async (doc) => {
    if (doc._type === 'quote') {
        const quote = await {
            ...doc,
            partner: await client.getDocument(doc.partner._ref),
        }

        return quote
    } else if (doc._type === 'quoteCarousel' && doc.quotes) {
        const quote = await {
            ...doc,
            quotes: await Promise.all(doc.quotes.map(async quote => getReference(quote))),
        }

        return quote
    } else if (doc._type === 'people' && doc.people) {
        const people = await {
            ...doc,
            people: await Promise.all(doc.people.map(async person => getReference(person))),
        }

        return people
    }


    return doc
}

async function getReference(ref) {
    const document = await client.getDocument(ref._ref).then(doc => checkDoc(doc)).catch(err => console.error(err));
    
    return {...document};
}

async function generatePage(doc) {
    const fields = {
        ...doc,
        body: await Promise.all(doc.body.map(block => {
            if (block._type === 'reference') {
                return getReference(block)
            }

            if (block._type === 'quoteCarousel') {
                return checkDoc(block)
            }

            if (block._type === 'people') {
                return checkDoc(block)
            }

            return block;
        }))
    }

    return fields
}


async function getPages() {
    const query = `*[_type == "page" && publishTo == "ws" && !(_id in path("drafts.**"))]{ 
        ...,
     }`
    const docs = await client.fetch(query).catch(err => console.error(err));
    const preparePages = await Promise.all(docs.flatMap(doc => generatePage(doc)))
    return preparePages;
}

module.exports = getPages;