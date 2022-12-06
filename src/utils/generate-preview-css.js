const postcss = require('postcss')
const postcssImport = require('postcss-import')
const autoprefixer = require('autoprefixer')
const postcssMixins = require('postcss-mixins')
const postcssNested = require('postcss-nested')
const cssnano = require('cssnano')
const path = require('path')
const fs = require('fs')

console.log("Building stylesheet for preview!")
const filepath = path.join(
        __dirname,
        "src/_includes/assets/css/index.css");

fs.readFile("src/_includes/assets/css/index.css", (err, css) => {
        postcss([autoprefixer, postcssMixins, postcssNested, postcssImport, cssnano])
          .process(css, { from: 'src/_includes/assets/css/index.css', to: '_site/assets/build/index.css' })
          .then(result => {
            // fs.writeFile('src/_includes/assets/css/build.css', result.css, () => true)
            fs.writeFile('_site/assets/build/index.css', result.css, () => true)
          })
      })
      console.log("Built stylesheet for preview!")