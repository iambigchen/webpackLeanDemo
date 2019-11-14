const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const webpack = require('webpack');
module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].js',
    publicPath: '/abc/',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 9999,
    compress: true,
    before(app) {
      app.get('/api/seller', (req, res) => {   // 使用 app.get() 方法模拟后端
        res.json({  // 使用 res.json() 方法转换为 JSON 格式
          errno: 0,
          data: 123  // 指定地址匹配时，应返回的数据
        })
      })

      app.get('/api/goods', (req, res) => {
        res.json({
          errno: 0,
          data: 234
        })
      })

      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: 345555
        })
      })
    },
    after(app, server, compiler) {
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: 345
        })
      })
    },
    contentBase: ['./static', './lib'],
    clientLogLevel: 'silent',
    hot: true,
    https: true,
    index: 'a.html',
    inline: true,
    onListening: function(server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port);
    },
    headers: {
      'Cookie': '_T_WM=044532f80b8fabc6dc347fd417c33202; ALF=1517569014; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhQljxrwvAfCCZa_p.u8pB.5JpX5K-hUgL.Fo2cS0qRehBcSKM2dJLoI7HpqJ8XwBtt; SCF=AkQsXaaTywl0RziwnumQ0tVE_xW5udcpoGP43q7eb2tFW9lXRc4bVNOn9N5m_ZKwFc-Q2r4Hz5oMBAbVJuhI1uk.; SUB=_2A253SLARDeRhGedI7FQZ8CrKzjuIHXVUstBZrDV6PUJbktANLUXEkW1NVtAHXD7nHQtwFntsDZsmqj2nB17cClnd; SUHB=0k1zt1ckxYq3c6; H5_INDEX_TITLE=qbaty; H5_INDEX=0_all; WEIBOCN_FROM=1110006030; M_WEIBOCN_PARAMS=oid%3D4193586758833502%26luicode%3D20000061%26lfid%3D4193594443440569%26uicode%3D20000061%26fid%3D4193586758833502'
    },
    open: true,
    openPage: ['a.html', 'b.html'],
    proxy: [{
      context: function (pathname, req)  {
        return (pathname.match('^/comments') && req.method === 'GET');
      },
      target: 'https://m.weibo.cn',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
          '^/comments': '/api/comments',
          '^/xxx': '/api'
      }
    }],
    useLocalIp: true,
    // public: 'twww.lizihang.com'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'a.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 1000
  // }
}