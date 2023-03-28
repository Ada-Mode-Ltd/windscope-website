# Windscope website - Frontend

The frontend website is built using the [Eleventy](https://www.11ty.dev/) static site generator (using the Liquid templating language). The site is deployed [Netlify](https://app.netlify.com/). Deploys are triggered automatically on any `git push` on the `main` branch.

## Getting started

1. Clone the repository `git clone https://github.com/Ada-Mode-Ltd/windscope-website.git`
1. Open the directory `cd windscope-website`
1. Run `npm install`
1. Create a `.env` file in the root (`/`) folder
1. You will need the following secrets in the `.env` file:

- SANITY_READ_TOKEN

## Local development

All webpage code is in the `/src` folder.

### Data files

The `/src/_data` folder contains a number of files that pull in content from the Sanity backend. This data is then used by the page template files to generate page content.

### CSS

Stylesheets for this project are located in the `/src/_includes/assets/css` folder.

### JS

Javascript used on the website for certain functionality can be found in the `/src/_includes/assets/js` folder.

### Functions

The website uses Netlify functions for some functionality (website preview in Sanity). These functions can be found in the `/netlify/functions` folder. They are automatically deployed along with each site build on Netlify.

## More details

- Website: <https://netlify.com>
- Account Management: <https://app.netlify.com/>
