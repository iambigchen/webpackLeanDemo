const path = require('path')
const webpack = require('webpack')
const WebpackHtmlPlugin = require('webpack-html-plugin')
module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      jquery$: path.resolve(__dirname, 'libs/jquery.min.js')
    }
  },
  module: {
    rules: [
      {
        test: path.resolve(__dirname, 'app.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              $: 'jquery' //这里会解析应该从nodeModules中拿还是从resolve/alias中拿。这样配置就不需要ProvidePlugin插件了
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: 'jquery'
    // }),
    new WebpackHtmlPlugin({
      filename: 'index.html'
    })
  ]
}