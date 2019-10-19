module.exports = {
  ident: 'postcss', // 表明接下来的插件是给postcss使用
  plugins: [
      // 自动加浏览器前缀
    // require('autoprefixer')()
    require('postcss-cssnext')() // postcss-cssnext包含了autoprefixer，所以不用添加两个
  ]
}