const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '6bsgjen8',
  dataset: 'production',
  apiVersion: '2022-09-26', // use current UTC date - see "specifying API version"!
//   token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})

module.exports = { client }