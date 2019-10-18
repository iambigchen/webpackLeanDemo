#### style-loader
配置有：（1.0以上的版本）
1. injectType 用那种形式把css注入到页面中
 
1.1 styleTag 用一个style标签注入到页面中

1.2 singletonStyleTag 如果引入了多个css文件，都放到一个style标签中

1.3 lazyStyleTag 以懒加载的形式注入，即使用了该模式，css会有use和unuse两个方法，执行了use才会把css注入到页面中
```js
import styles from './css/base.css'
styles.use()
setTimeout(() => {
  styles.unuse()
}, 1000)
```

1.4 lazySingletonStyleTag 以懒加载的形式将多个css以一个style标签的形式注入

1.5 linkTag 以link标签的形式注入，需要配合file-loader，把css单独打成.css文件。再以link引入

2. attributes 给style或者link标签加入属性

3. insert style或者link标签插入的位置，可以是head、body也可以是自定义函数
```js
rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { 
              injectType: 'linkTag',
              attributes: {
                id: 'id'
              },
              insert: function(element) {
                var parent = document.querySelector('#box')
                var lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;
                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }
                window._lastElementInsertedByStyleLoader = element;
              }
            }
          },
          'file-loader'
        ]
      }
    ]
```

4. base 当有多个配置文件时，style-loader的配置可能会冲突覆盖，可以通过base设置权重，以某个配置优先