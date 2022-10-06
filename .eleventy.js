const EleventyPluginNavigation = require('@11ty/eleventy-navigation')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')

const imageShortcode = require('./src/_11ty/shortcodes/image')
const { dateFormat, w3cDate } = require('./src/_11ty/filters/date')
const sanityImageUrl = require('./src/_11ty/shortcodes/sanityImageUrl')
const portableText = require('./src/_11ty/shortcodes/portableText')
const getReferences = require('./src/_11ty/shortcodes/getReference')


const rollupPluginCritical = require('rollup-plugin-critical').default

const dev = process.env.NODE_ENV === 'production' ? false : true;

module.exports = function(eleventyConfig) {

	// Filters
	// Check if the page is part of the Design System
	eleventyConfig.addFilter('isDesignSystem', function (page) {
		return page.url.startsWith('/design-system/')
	})

	eleventyConfig.addFilter('w3cDate', w3cDate)
	eleventyConfig.addFilter('dateFormat', dateFormat)
	eleventyConfig.addFilter('makeArray', function(obj) {
		return [obj]
	});
	eleventyConfig.addFilter('setId', function(content) {
		return content?._key || content?._id
	});

	// Shortcodes
	eleventyConfig.addShortcode("image", imageShortcode); // Because copyright text in the footer ...
	eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`); // Because copyright text in the footer ...
	eleventyConfig.addShortcode("sanityImageUrl", sanityImageUrl)
	eleventyConfig.addShortcode("portableText", portableText)
	eleventyConfig.addShortcode("getReferences", getReferences)

	eleventyConfig.addShortcode("console", (content) => { console.log(content); return })


  eleventyConfig.addPlugin(EleventyPluginNavigation)
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		tempFolderName: '.11ty-vite', // Default name of the temp folder

		// Vite options (equal to vite.config.js inside project root)
		viteOptions: {
			publicDir: 'public',
			clearScreen: false,
			server: {
				mode: 'development',
				middlewareMode: true,
			},
			appType: 'mpa',
			// assetsInclude: ['**/*.xml', '**/*.txt'],
			build: {
				mode: 'production',
				sourcemap: 'true',
				manifest: true,
				dynamicImportVarsOptions: ['./src/assets/fonts/WorkSans-VariableFont_wght.woff2'],
				// This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
				rollupOptions: {
					output: {
						assetFileNames: 'assets/css/[name].[hash].css',
						chunkFileNames: 'assets/js/[name].[hash].js',
						entryFileNames: 'assets/js/[name].[hash].js'
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
				}
			}
		}
	})

	// Maybe you want to ignore these files in production later
    // if (!dev) {
    //     eleventyConfig.ignores.add("src/design-system/**");
    // }

    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/assets/js");
	eleventyConfig.addPassthroughCopy("public/assets/**");
	
	if (!dev) {
	eleventyConfig.on('eleventy.after', async () => {
		const { copy } = require('fs-extra')
		await copy('public/assets/img/remote', '_site/assets/img/remote')
	});
}

    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: "_site",
        includes: "_includes",
        layouts: "_layouts",
        htmlTemplateEngine: "liquid",
      }
    }
  };