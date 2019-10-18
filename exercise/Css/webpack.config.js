const path = require('path')
// let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
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
        use: [
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: function(url, resourcePath) {
                console.log(url, resourcePath)
                return true
              },
              import: false,
              modules: false,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: 
          // MiniCssExtractPlugin.loader,
          // {
          //   loader: 'css-loader',
          //   options: {
          //     url: function(url, resourcePath) {
          //       console.log(url, resourcePath)
          //       return true
          //     },
          //     import: false,
          //     modules: false,
          //     importLoaders: 2,
          //     sourceMap: true
          //   }
          // },
          // 'sass-loader'
          ExtractTextWebpackPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  url: function(url, resourcePath) {
                    console.log(url, resourcePath)
                    return true
                  },
                  import: false,
                  modules: false,
                  importLoaders: 2,
                  sourceMap: true
                }
              },
              'sass-loader'
            ]
          })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('css/b.css')
    // new MiniCssExtractPlugin({
    //   filename: 'css/a.css'
    // })
  ]
}