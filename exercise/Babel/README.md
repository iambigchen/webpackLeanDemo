#### babel

##### 配置loader
```js
module: {
    rules: [
        {
        test: /\.js$/,
        use: {
            loader: 'babel-loader'
        },
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules')
        }
    ]
}
```

##### 为babel配置option
有两种配置方法
1.直接在loader中配置
2.在项目的根目录下建一个`.babelrc`文件，在该文件中用json格式配置.

```js
// 在loader中配置
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
        presets: [
            [
            '@babel/preset-env', {
                targets: {
                browsers: ['> 1%', 'last 2 versions']
                }
            }
            ]
        ]
        }
    }
}
```

```js
// .babelrc中配置
{
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "browsers": ["> 1%", "last 2 versions"]
        }
      }
    ]
  ]
}
```

##### preset 预设 比如转es6，es5等

##### preset.target 浏览器或者node的版本支持情况

##### 针对函数和方法
preset只能简单的将一下es6的语法进行转换，但针对一下函数和方法没有办法转换。解决方案：

1.`babel-polyfill`全局垫片,相当于定义了一下全局的方法。比如：会在全局定义一个`promise`方法，这样在使用时，就不会报错

使用方法：
1.1.在入口文件`import 'babel-polyfill'`
1.2.如果是多入口文件，或者不希望在逻辑代码中添加，可以在`webpack`的`entry`中添加
```js
entry: {
    app: ['babel-polyfill', './app.js']
}
```

缺点： 造成了全局污染，造成打包后的代码添加了很多无用代码，增加了代码的体积

2.`Babel Runtime Transform`是局部垫片，不会造成全局污染，而且不需要在代码中引入，只需配置babel即可

使用方法:
2.1 安装`@babel/plugin-transform-runtime`和`@babel/runtime`
2.2 配置`babel`
```js
{
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "browsers": ["> 1%", "last 2 versions"]
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

