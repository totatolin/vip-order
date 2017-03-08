var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })
if (process.env.API_KEY === 'development') {
  module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_KEY: '"development"'
  })
}else if (process.env.API_KEY === 'production') {
  module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_KEY: '"production"'
  })
}
