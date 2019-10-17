const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    app: './src/entryA.js',
    appB: './src/entryB.js',
    vendor: ['lodash']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'runtime'],
        minChunks: Infinity,
        filename: '[name].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
      chunks: ['app', 'appB']
    })
  ]
}