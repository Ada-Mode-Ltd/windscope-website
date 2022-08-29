const dev = process.env.NODE_ENV === 'production' ? false : true;

module.exports = function(eleventyConfig) {

    if (!dev) {
        eleventyConfig.ignores.add("src/design/**");
    }

    eleventyConfig.addPassthroughCopy({
      public: './'
    })

    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: dev ? "_dev" : "_site",
        includes: "_includes",
        layouts: "_layouts",
        htmlTemplateEngine: "liquid",
      }
    }
  };