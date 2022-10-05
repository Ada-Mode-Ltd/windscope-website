const { toHTML } = require('@portabletext/to-html')

const htm = require('htm')
const vhtml = require('vhtml')
const html = htm.bind(vhtml)

const serializer = {
    // types: {
    //   image: ({value}) => html`<img src="${value.imageUrl}" />`,
    //   callToAction: ({value, isInline}) =>
    //     isInline
    //       ? html`<a href="${value.url}">${value.text}</a>`
    //       : html`<div class="callToAction">${value.text}</div>`,
    // },
  
    marks: {
        highlightBlue: ({children}) => html`<span class="color-primary">${children}</span>`,
        highlightGreen: ({children}) => html`<span class="color-accent">${children}</span>`,
    },
}

const portableText = (text) => {
    const output = toHTML(text, {components: serializer})
    
    return output
}

module.exports = portableText