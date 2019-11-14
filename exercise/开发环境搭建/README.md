#### watch
开启watch两种方法
1. webpack -w (webpack -watch)
2. 在webpack.config.js 中 配置
```js
watch: true,
watchOptions: {
  ignored: /node_modules/, // 忽略某个文件或文件夹
  aggregateTimeout: 1000, // 监听到变化发生后会等300ms再去执行动作
  poll: 1000 // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的 默认每隔1000毫秒询问一次
}
```

#### webpack-dev-server
需要安装webpack-dev-server，并且配置npm scripts
有webpack-dev-server起的服务， 可以通过路由加webpack-dev-server，进行查看文件

配置
1. devServer.after
在所有的中间件之后执行的函数

2. devServer.before
在所有的中间件之前执行的函数。在该配置项中，可以配置mock数据。具体配置如下
```js
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
  app.get('/api/ratings', (req, res) => { //after也可以配置，但是不会覆盖before，反而会优先使用before的配置，所以应该优先在before中配置mock
    res.json({
      errno: 0,
      data: 345
    })
  })
}
```

3. devServer.contentBase 
服务器引用静态资源的地址，即在页面中引入静态资源时的目录
可以是数组，如果是数组，会从第一个挨个往后请求，如果找不到，会尝试着第二个地址
```js
// webpack.config.js
contentBase: './static'

// index.html
<link rel="stylesheet" href="/index.css">

// 这样静态css的指向是当前项目根目录的static/index.css
```

4. devServer.clientLogLevel 日志等级

5. devServer.color 只支持在命令上配置，不支持在webpack.config.js中配置
```js
webpack-dev-server --color
```

6. devServer.compress 是否启动gzip压缩

7. devServer.historyApiFallback history模式

8. devServer.hot 启动热更新模式
一下loader 如css-loader vue-loader都内置了hot
如果自己实现，需要写额外代码
```js
if (module.hot) {
  module.hot.accept('./B.js', function() {
    console.log('Accepting the updated printMe module!');
  })
}
```

9. devServer.https 开启https，也可以配置https的key
```js
devServer: {
  https: {
    key: fs.readFileSync('/path/to/server.key'),
    cert: fs.readFileSync('/path/to/server.crt'),
    ca: fs.readFileSync('/path/to/ca.pem'),
  }
}
```

10. devServer.index 指定index file的名字
注意： 如果配置了HtmlWebpackPlugin 的filename，需要将该index改成相同的名字，这样才能找到对应的文件

11. devServer.inline 如果是false，则会切换到iframe模式

12. devServer.lazy 如果开启，则不会监听所有的文件改动，开发服务器仅在收到请求时才编译
如果使用，要把inline置为false。 具体的请求文件可以通过配置filename

13. devServer.onListening 当起的本地服务开始监听端口时，执行该函数

14. devServer.open 是否打开浏览器，也可以指定浏览器

15. devServer.openPage 打开浏览器时，打开的页面. 可以是数组，如果是数组，则会打开多个页面

16. devServer.overlay 当出现错误的时候，是否会用遮罩在全屏展示. 可与eslint搭配

17. devServer.port 端口

18. devServer.proxy 代理
三种写法
18.1. 以对象的形式
```js
proxy: {
  '/comments': {
    target: 'https://m.weibo.cn',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/comments': '/api/comments'
    }
  }
}
```
18.2. 多个context的代理规则相同时
```js
proxy: [
  {
    context: ['/comments', '/xxx'],
    target: 'https://m.weibo.cn',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/comments': '/api/comments',
        '^/xxx': '/api'
    }
  }
]
```

18.3. 自定义函数
```js
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
}]
```

19. devServer.public 本地服务下的前置域名，一般做ngxin代理后才使用该配置

20. devServer.publicPath 起的服务文件放在什么位置,如果没有配置，但是output中配置了，会取output中的publicPath

21. devServer.useLocalIp 使用本地ip打开，但是如果配置了public，就不会生效


