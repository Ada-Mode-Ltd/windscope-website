const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  const formats = src.includes('.gif') ? ['webp', 'gif'] : ["avif", "webp", "svg", "jpeg"]
  let metadata = await Image(src, {
    formats,
    urlPath: "/assets/img/remote/",
    outputDir: "./public/assets/img/remote/",
    sharpOptions: {
      animated: true
    },
    svgShortCircuit: true,
        cacheOptions: {
          duration: "30d",
          directory: ".cache",
          removeUrlQueryParams: false,
        },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;