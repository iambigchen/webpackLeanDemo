const path = require('path')
const webpack = require('webpack')

module.exports = [function() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        entry: './src/app.js',
        mode: 'none',
        output: {
          filename: '[name]3.js',
          path: path.resolve(__dirname, 'dist') 
        }
      })
    })
  })
},{
  context: path.resolve(__dirname, 'src'),
  entry: () => {
    return new Promise(resolve => {
      resolve({
        a: './app.js'
      })
    })
  },
  output: {
    libraryTarget: 'this',
    library: 'A',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      jquery$: path.resolve(__dirname, 'static/jquery.min.js')
    },
    enforceExtension: false,
    extensions: ['.ts', '.js']
  },
  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    historyApiFallback: {
      rewrites: [
        // /user 开头的都返回 user.html
        { from: /^\/user/, to: '/user.html' },
        { from: /^\/game/, to: '/game.html' },
        // 其它的都返回 index.html
        { from: /./, to: '/index.html' },
      ]
    },
    headers: {
      'X-foo':'bar'
    },
    allowedHosts: [
        // 匹配单个域名
        'host.com',
        'sub.host.com',
        // host2.com 和所有的子域名 *.host2.com 都将匹配
        '.host2.com'
    ],
    open: true,
    openPage: 'https://www.baidu.com',
    clientLogLevel: 'none',
    port: '8080'
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 3000,
    poll: 1000
  },
  devtool: 'source-map',
  target: 'electron-main',
  module: {
    noParse: /jquery/
  },
  stats: { // 控制台输出日志控制
    assets: false,
    colors: false,
    errors: false,
    errorDetails: false,
    hash: false,
  },
  mode: 'none',
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery'
    })
  ]
}, function() {
  return {
    entry: './src/app.js',
    mode: 'none',
    output: {
      filename: '[name]2.js',
      path: path.resolve(__dirname, 'dist') 
    }
  }
}]