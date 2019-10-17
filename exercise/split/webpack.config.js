const path = require('path')
const webpack = require('webpack')
module.exports = {
  // entry: './requireEnsure.js', //requireEnsure
  // entry: './requireInclude.js', //requireEnsure
  // entry: './import.js',
  entry: {
    app: './import.js',
    app2: './importB.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 2,
      children: true,
      async: 'async-common'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manmifest'],
      minChunks: Infinity
    })
  ]
}