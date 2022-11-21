const { toHTML } = require('@portabletext/to-html')
const image = require('./image')
const { sanityBlogImageUrl } = require('./sanityImageUrl')

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

    return html`<img src="${url}" alt="${value.altText}" />`
}

const serializer = {
    types: {
      image: ({ value }) => {
        const img = imageSerializer(value)
        return html`${img}`
      },
      videoId: ({ value }) => {
        const { id, service } = value
        if (service === 'youtube') {
            return html`<div class="video-wrapper"><lite-youtube videoid="${id}"></lite-youtube></div>`
        } else if (service === 'vimeo') {
            return html`<div class="video-wrapper"><lite-vimeo videoid="${id}"></lite-vimeo></div>`
        }
    },
    quote: ({ value }) => {
        const { text, attribution, partner } = value
        return html`<div class="partner-quote flow">
            <div class="quote__text">${text}</div>
            <div class="quote__author text--small">${attribution.name}, ${attribution.title}</div>
            ${imageSerializer(partner.logo)}
        </div>`
    },
    largeStat: ({ value }) => {
        const { statDescription, stat } = value
        return html`<div class="large-stat"><span class="color-accent">${stat}</span><p class="text--small">${statDescription}</p></div>`
    }
},
    
        marks: {
            highlightBlue: ({children}) => html`<span class="color-primary">${children}</span>`,
            highlightGreen: ({children}) => html`<span class="color-accent">${children}</span>`,
            link: ({children, value}) => html`<a href="${value.href}" class="text-link secondary">${html(children)}</a>`,
            internalLink: ({children, value}) => html`<a href="/${value.slug.current}" class="text-link secondary">${html(children)}</a>`
        },
}

async function portableText(text) {
    const output = await toHTML(text, {components: serializer})
    return output
}

module.exports = portableText