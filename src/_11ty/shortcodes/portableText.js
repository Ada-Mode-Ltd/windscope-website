const { toHTML } = require('@portabletext/to-html')

const portableText = (text) => {
    const html = toHTML(text, {
        serializers: {
        },
    })
    return html
}

module.exports = portableText