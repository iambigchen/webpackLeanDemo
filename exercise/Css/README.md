#### css-loader
配置项如下：
1. url 启用/禁用 url() 处理 支持自定义函数
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          url: (url, resourcePath) => {
            // resourcePath - path to css file

            // Don't handle `img.png` urls
            if (url.includes('img.png')) {
              return false;
            }

            return true;
          },
        },
      },
    ],
  },
};
```

2. import 是否对@import进行解析 支持自定义函数
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          import: (parsedImport, resourcePath) => {
            // parsedImport.url - url of `@import`
            // parsedImport.media - media query of `@import`
            // resourcePath - path to css file

            // Don't handle `style.css` import
            if (parsedImport.url.includes('style.css')) {
              return false;
            }

            return true;
          },
        },
      },
    ],
  },
};
```

3. modules 是否对css module进行解析， 默认是不解析false。也可以是个对象，对css module的一些配置

4. sourceMap  是否开启css的sourceMap， 另外：如果也配套使用了style-loader，css-loader开启sourceMap，style-loader也会随着一起开启

#####  mini-css-extract-plugin / extract-css-chunks-webpack-plugin 
官方推荐使用这两个插件将css提取出来，这样有助于css和js并行加载. style-loader也可以实现该功能，如果用了这两个插件，就不必用style-loader

```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: function(url, resourcePath) {
                console.log(url, resourcePath)
                return true
              },
              import: false,
              modules: false,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: function(url, resourcePath) {
                console.log(url, resourcePath)
                return true
              },
              import: false,
              modules: false,
              importLoaders: 2,
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/a.css'
    })
  ]
```
