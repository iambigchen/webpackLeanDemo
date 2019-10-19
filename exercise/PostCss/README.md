#### postcss
是一款使用插件去转换CSS的工具
配置方法： 
1. 直接在loader中配置
```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader:'css-loader',
            options:{
              importLoaders:1
            }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
                // 自动加浏览器前缀
              require('autoprefixer')()
            ]
          }
        }]
      }
    ]
  }
```

2. 在根目录下新建postcss.config.js
```js
module.exports = {
  ident: 'postcss',
  plugins: [
      // 自动加浏览器前缀
    require('autoprefixer')()
  ]
}
```

postcss的插件
##### autoprefixer
为css加前缀和后缀。autoprefixer需要指定Browserslist，有以下几种写法：
1. .browserslistrc 在项目根目录
```js
>= 1%
```

2. package.json
```json
"browserslist": [
    ">= 1%"
  ]
```
##### postcss-cssnext
运用css新语法
postcss-cssnext包含了autoprefixer，所以不用添加两个