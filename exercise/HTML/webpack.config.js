const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: './app.js',
    app2: './app2.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 600
            }
          }
        ]
      },
      {
        test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src', 'img:data-src']
              }
            }
          ],
          exclude: [
            path.resolve(__dirname, 'index.html')
          ]
      }
    ]
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
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      cache: true,
      chunksSortMode: function(a, b) {
        return (a.names[0] > b.names[0])? 1 : -1;
      },
      showErrors: true
    })
  ]
}