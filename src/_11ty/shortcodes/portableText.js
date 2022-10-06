const { toHTML } = require('@portabletext/to-html')
const image = require('./image')
const imageUrl = require('./sanityImageUrl')

const htm = require('htm')
const vhtml = require('vhtml')
const html = htm.bind(vhtml)

const serializer = {
    types: {
      image: ({ value }) => html`<img src="${imageUrl(value)}" alt="${value.altText}" />`
    },
  
    marks: {
        highlightBlue: ({children}) => html`<span class="color-primary">${children}</span>`,
        highlightGreen: ({children}) => html`<span class="color-accent">${children}</span>`,
    },
}

const portableText = async (text) => {
    const output = await toHTML(text, {components: serializer})
    
    return output
}

module.exports = portableText