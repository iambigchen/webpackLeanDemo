const path = require('path')

module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader:'css-loader',
            options:{
              importLoaders:1
            }
        }, {
          loader: 'postcss-loader'
        }]
      }
    ]
  }
}