#### 代码提取

`src/entryA`和`src/entryB`都引入了`moduleA'`,但是代码打包后，发现`moduleA`被打包了两次。所以需要进行代码的提取，进而减少重复代码

##### webpack.optimize.CommonsChunkPlugin 
对单入口文件，不起作用（webpack4该插件被废弃）

该例子中入口chunk有两个，entryA entryB

第三方依赖chunk 为lodash

公共依赖的chunk moduleA

webpack.optimize.CommonsChunkPlugin 最优实现是将第三方依赖，webpack运行文件 和自定义公共模块分别提取到不同的js中。这么做的好处是减少了入口chunk的大小，避免了首屏加载的文件过大

webpack.optimize.CommonsChunkPlugin 使用
```js
// 将lodash打包至vendor，moduleA打包至common， webpack运行文件打包至runtime
// minChunks默认值是入口文件的数量
entry: {
    app: './src/entryA.js',
    appB: './src/entryB.js',
    vendor: ['lodash']
},
...
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'],
      minChunks: Infinity,
      filename: '[name].js'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: '[name].js',
    chunks: ['app', 'appB']
  })
]
```

[webpack.optimize.CommonsChunkPlugin详细方法]('https://segmentfault.com/a/1190000012828879')