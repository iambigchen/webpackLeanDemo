#### resolve.alias
是否配置该项，决定了取第三方库是从本地，还是从node_modules中取

#### webpack.ProvidePlugin
自动加载模块插件，不需要每个文件都引用
```js
plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery' // 是从node_modules取还是本地，取决于resolve.alias
    })
  ]
```

#### imports-loader
也是全局的引用某个模块，具体取地址也是受到resolve.alias决定
```js
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
```