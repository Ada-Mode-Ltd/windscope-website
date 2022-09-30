const { toHTML } = require('@portabletext/to-html')

const portableText = (text) => {
    const html = toHTML(text, {
        serializers: {
            // Add custom serializers here
        },
    })
    return html
}

module.exports = portableText