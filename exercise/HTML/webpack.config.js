const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '123',
      filename: 'index.html',
      template: './index.html',
      templateParameters: {
        title: 'abc',
        foo: 'bar'
      },
      inject: 'head',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      minify: false,
      hash: true,
      cache: true,
      showErrors: true
    })
  ]
}