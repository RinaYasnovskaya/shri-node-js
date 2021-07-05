const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FindUnusedCodePlugin = require('../FindUnusedCodePlugin');

const buildWebpackConfig = merge(baseWebpackConfig, {

  mode: 'production',
  plugins: [
    new FindUnusedCodePlugin(),
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
