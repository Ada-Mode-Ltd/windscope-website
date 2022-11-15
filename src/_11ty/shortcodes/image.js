const Image = require("@11ty/eleventy-img");
const { cache } = require("@11ty/eleventy/src/TemplateCache");

async function imageShortcode(src, alt, loading = 'lazy', sizes) {
  const formats = src.includes('.gif') ? ['webp', 'gif'] : ["avif", "webp", "svg", "jpeg"]
  let directory = '.cache'
  let duration = '90d'
  if(process.env.ELEVENTY_SERVERLESS) {
    directory = 'cache'
    duration = "*"
  }
  
  let metadata = await Image(src, {
    formats,
    urlPath: "/assets/img/remote/",
    outputDir: "./public/assets/img/remote/",
    sharpOptions: {
      animated: true
    },
    svgShortCircuit: true,
        cacheOptions: {
          duration: duration,
          directory: directory,
          removeUrlQueryParams: false,
        },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading,
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;