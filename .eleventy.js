const EleventyPluginNavigation = require("@11ty/eleventy-navigation");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

const imageShortcode = require("./src/_11ty/shortcodes/image");
const { dateFormat, w3cDate } = require("./src/_11ty/filters/date");
const { sanityImageUrl } = require("./src/_11ty/shortcodes/sanityImageUrl");
const portableText = require("./src/_11ty/shortcodes/portableText");
const getReferences = require("./src/_11ty/shortcodes/getReference");

const { copy } = require("fs-extra");

const dev = process.env.NODE_ENV === "production" ? false : true;
// console.log("dev", dev);
const isServerless = process.env.ELEVENTY_SERVERLESS || false

module.exports = function (eleventyConfig) {
  // Filters
  // Check if the page is part of the Design System
  eleventyConfig.addFilter("isDesignSystem", function (page) {
    return page.url.startsWith("/design-system/");
  });

  eleventyConfig.addFilter("w3cDate", w3cDate);
  eleventyConfig.addFilter("dateFormat", dateFormat);
  eleventyConfig.addFilter("makeArray", function (obj) {
    return [obj];
  });
  eleventyConfig.addFilter("setId", function (content) {
    return content?._key || content?._id || new Date().getTime();
  });

  eleventyConfig.addFilter("getRelatedPosts", function (posts, post) {
    // Get the tags from the post
    const tags = post.categories.map((c) => c.title);
    // Filter out the current post
    const relatedPosts = posts
      .filter((p) => p._id !== post._id)
      .filter((p) => p.categories.some((t) => tags.includes(t.title)));
    // Ensure that 3 related posts are returned, or add more if there are not enough
    if (relatedPosts.length < 3) {
      const morePosts = posts
        .filter((p) => p._id !== post._id)
        .filter((p) => !p.categories.some((t) => tags.includes(t.title)));
      relatedPosts.push(...morePosts.slice(0, 3 - relatedPosts.length));
    }

    return relatedPosts;
  });

  // Shortcodes
  eleventyConfig.addPairedShortcode("postcss",
  async code => {

  // for relative path CSS imports
  const filepath = path.join(
    __dirname,
    "src/_includes/assets/css/index.css");

  return await postcss([
    autoprefixer, postcssMixins, postcssNested, postcssImport
  ]).process(
    code,
    { from: filepath })
  .then(result => result.css);
});

  eleventyConfig.addShortcode("image", imageShortcode); // Because copyright text in the footer ...
  eleventyConfig.addShortcode(
    "currentYear",
    () => `${new Date().getFullYear()}`
  ); // Because copyright text in the footer ...
  eleventyConfig.addShortcode("sanityImageUrl", sanityImageUrl);
  eleventyConfig.addLiquidShortcode("portableText", portableText);
  eleventyConfig.addShortcode("getReferences", getReferences);
  eleventyConfig.addShortcode("analyticsScript", () => {
    if (dev || isServerless) return "";
    return `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-213481953-1"></script>
    <script>
    if(window.location.host === 'winscope.io')
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());

  gtag('config', 'UA-213481953-1');
  }
</script>
    `})

  eleventyConfig.addPlugin(EleventyPluginNavigation);

  // eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
  // 	name: 'preview',
  // 	functionsDir: './netlify/functions/',
  //   })

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "preview", // The serverless function name from your permalink object
    functionsDir: "./netlify/functions/",
    copy: ['src/_includes/assets/css/build.css', {from: 'src/_includes/assets/js'}],
    excludeDependencies: ["rollup-plugin-critical"],
  });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: ".11ty-vite", // Default name of the temp folder

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: "public",
      clearScreen: false,
      server: {
        mode: "development",
        middlewareMode: true,
      },
      appType: "custom",
      assetsInclude: ["**/*.xml", "**/*.txt"],
      build: {
        mode: "production",
        sourcemap: "true",
        manifest: true,
        dynamicImportVarsOptions: [
          "./src/assets/fonts/WorkSans-VariableFont_wght.woff2",
        ],
        // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        rollupOptions: {
          output: {
            assetFileNames: "assets/css/[name].[hash].css",
            chunkFileNames: "assets/js/[name].[hash].js",
            entryFileNames: "assets/js/[name].[hash].js",
          },
          // plugins: [rollupPluginCritical({
          // 		criticalUrl: './_site/',
          // 		criticalBase: './_site/',
          // 		// criticalPages: [
          // 		// 	{ uri: 'index.html', template: 'index' },
          // 		// 	{ uri: 'posts/index.html', template: 'posts/index' },
          // 		// 	{ uri: '404.html', template: '404' },
          // 		// ],
          // 		criticalConfig: {
          // 			inline: true,
          // 			dimensions: [
          // 				{
          // 				  height: 900,
          // 				  width: 375,
          // 				},
          // 				{
          // 				  height: 720,
          // 				  width: 1280,
          // 				},
          // 				{
          // 					height: 1080,
          // 					width: 1920,
          // 				}
          // 			],
          // 			// penthouse: {
          // 			// 	forceInclude: ['.fonts-loaded-1 body', '.fonts-loaded-2 body'],
          // 			//   }
          // 		}
          // 	})
          // ]
        },
      },
    },
  });

  // Maybe you want to ignore these files in production later
  // if (!dev) {
  //     eleventyConfig.ignores.add("src/design-system/**");
  // }
  eleventyConfig.addPassthroughCopy("src/_includes/assets/css");
  // eleventyConfig.addPassthroughCopy({ "public/assets/build.css": "assets/preview/index.css" });
  eleventyConfig.addPassthroughCopy("src/_includes/assets/js");
  eleventyConfig.addPassthroughCopy("public/assets/**/*");


  eleventyConfig.on("eleventy.after", async () => {
  if(!dev || !isServerless) {
      await copy("public/assets/img/remote", "_site/assets/img/remote");
    }
  })

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      htmlTemplateEngine: "liquid",
    },
  };
};
