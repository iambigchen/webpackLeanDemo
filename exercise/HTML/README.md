#### html-webpack-plugin
该插件的作用是生成一个html，并将webpack的入口文件自动引入

配置如下：
1. title 生成html的title

2. filename 生成html的名字 默认是index.html

3. template 以某个html文件作为模板生成html。使用了template,则title配置就会失效

4. templateParameters 允许覆盖模板中使用的参数。 即在该处定义的变量，可以在html模板中使用
```js
// webpack.config.js
templateParameters: {
  title: 'abc',
  foo: 'bar'
}
// template html
<title>abc</title>
<div>bar</div>
```

5. inject 将webpack打包后的文件放到html的什么地方 默认是body， 可以选择head

6. favicon html的favicon文件

7. meta html的meta

8. minify 静态资源的压缩情况，在webpack4中，如果mode是production 则默认为true，否则则默认为false

9. hash 如果为真，则向所有包含的 js 和 CSS 文件附加一个惟一的 webpack 编译散列。这对于更新每次的缓存文件名称非常有用

10. cache  设置 js css 文件的缓存，当文件没有发生变化时， 是否设置使用缓存。如果设置了hash，不设置缓存，则每次都会生成一个新文件

11. showErrors 当文件发生错误时， 是否将错误显示在页面
