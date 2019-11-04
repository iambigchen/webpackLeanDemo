#### 雪碧图
postcss-sprites插件可以将多个图片合成一张，生成雪碧图

使用方法如下：
在postcss.config.js中配置
```js
require('postcss-sprites')({
  spritePath: 'dist/assets/imgs/sprites',
  retina: true,
  filterBy: [
    function(image) {
      if (image.url.indexOf('@2x') > -1) {
        return Promise.reject();
      }
      return Promise.resolve('sprite@2x');
    }
  ],
  groupBy : [
    function(image) {
        if (image.url.indexOf('sprite1') === -1) {
            return Promise.reject();
        }
        return Promise.resolve('sprite1');
    },
    function(image) {
        if (image.url.indexOf('sprite2') === -1) {
            return Promise.reject();
        }
        return Promise.resolve('sprite2');
    }
  ]
}),
```

1. spritePath为生成雪碧图的位置 （除了生成的雪碧图外，还会将原图也打包）

2. filterBy 可以指定特定的函数，用于自定义哪些文件才进行雪碧图打包

3. retina 如果设置了true，则以@2x.png结尾的图片会自动以两倍图来处理

4. groupBy 可以配置分组，可以将同组图片生成在一张雪碧图