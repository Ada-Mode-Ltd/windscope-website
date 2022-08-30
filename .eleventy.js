const EleventyPluginNavigation = require('@11ty/eleventy-navigation')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')

const rollupPluginCritical = require('rollup-plugin-critical').default

const dev = process.env.NODE_ENV === 'production' ? false : true;

module.exports = function(eleventyConfig) {

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
			appType: 'custom',
			assetsInclude: ['**/*.xml', '**/*.txt'],
			build: {
				mode: 'production',
				sourcemap: 'true',
				manifest: true,
				// This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
				rollupOptions: {
					output: {
						assetFileNames: 'assets/css/main.[hash].css',
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
					// 			penthouse: {
					// 				forceInclude: ['.fonts-loaded-1 body', '.fonts-loaded-2 body'],
					// 			  }
					// 		}
					// 	})
					// ]
				}
			}
		}
	})

    if (!dev) {
        eleventyConfig.ignores.add("src/design/**");
    }

    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");

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