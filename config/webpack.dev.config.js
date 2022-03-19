const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpack = require('./webpack.base.config')

module.exports = merge(baseWebpack, {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../src'),
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
  },
})
