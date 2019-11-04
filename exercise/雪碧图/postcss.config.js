module.exports = {
  ident: 'postcss', // 表明接下来的插件是给postcss使用
  plugins: [
      // 自动加浏览器前缀
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
      ]
    }),
    require('postcss-cssnext')() // postcss-cssnext包含了autoprefixer，所以不用添加两个
  ]
}