const { toHTML } = require('@portabletext/to-html')
const image = require('./image')
const { sanityBlogImageUrl } = require('./sanityImageUrl')

// TODO: Add lite-yt & lite-vimeo support
const htm = require('htm')
const vhtml = require('vhtml')
const html = htm.bind(vhtml)

 function imageSerializer(value) {
    const url = sanityBlogImageUrl(value)

    if (value.caption) {
        return `<figure>
            <img src="${url}" alt="${value.altText}" />
        <figcaption>${value.caption}</figcaption>
        </figure>`
    }

    return `<img src="${url}" alt="${value.altText}" />`
}

const serializer = {
    types: {
      image: ({ value }) => {
        const img = imageSerializer(value)
        return html`${img}`
      },
    },
  
    marks: {
        highlightBlue: ({children}) => html`<span class="color-primary">${children}</span>`,
        highlightGreen: ({children}) => html`<span class="color-accent">${children}</span>`,
    },
}

async function portableText(text) {
    const output = await toHTML(text, {components: serializer})
    return output
}

module.exports = portableText