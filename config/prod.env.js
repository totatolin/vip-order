// module.exports = {
//   NODE_ENV: '"production"'
// }
if (process.env.API_KEY === 'development') {
  module.exports = {
    NODE_ENV: '"production"',
    API_KEY: '"development"'
  }
}else if (process.env.API_KEY === 'production') {
  module.exports = {
    NODE_ENV: '"production"',
    API_KEY: '"production"'
  }
}
