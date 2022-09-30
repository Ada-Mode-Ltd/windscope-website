const {client} = require('../../utils/sanity')
const imageUrlBuilder = require('@sanity/image-url')

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const sanityImageUrl = (image) => {
    const url = urlFor(image.asset).url()
		return url
}

module.exports = sanityImageUrl