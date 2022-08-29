const dev = process.env.NODE_ENV === 'production' ? false : true;

module.exports = function(eleventyConfig) {
    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: dev ? "_dev" : "_site"
      }
    }
  };