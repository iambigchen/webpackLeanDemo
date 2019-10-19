#### file-loader
配置入下：
1. name
如果带有/，会以目录的形式打包到dist下的该文件夹下

`[path][name][contenthash].[ext]`
 path 该文件所在目录 name 文件名称 contenthash 文件的hash值 ext 后缀

 也可以是函数，以自定义函数的形式命名

```js
{
  test: /\.(png|jpe?g|gif)$/i,
  loader: 'file-loader',
  options: {
    name(file) {
      if (process.env.NODE_ENV === 'development') {
        return '[path][name].[ext]';
      }

      return '[contenthash].[ext]';
    },
  }
},
```

2. outputPath 输出文件路径

配置了outputPath， 并且name有文件夹路径，则最后放的位置是dist/outputPath/namePath

也可以是函数

```js
rules: [
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'file-loader',
    options: {
      outputPath: (url, resourcePath, context) => {
        // `resourcePath` is original absolute path to asset 文件的绝对路径
        // `context` is directory where stored asset (`rootContext`) or `context` option webpack的context

        // To get relative path you can use
        // const relativePath = path.relative(context, resourcePath);

        if (/my-custom-image\.png/.test(resourcePath)) {
          return `other_output_path/${url}`;
        }

        if (/images/.test(context)) {
          return `image_output_path/${url}`;
        }

        return `output_path/${url}`;
      },
    },
  },
],
```

3. publicPath 文件的公共路径，项目中引用到的地方，会在原有的路径加上该路径。
```js
// main.js
import './3.png'
// webpack.config.js
{
  test: /\.(png|jpe?g|gif)$/i,
  loader: 'file-loader',
  options: {
    publicPath: 'assets',
  }
}
// 打包后的js引入的图片路径变成了assets/3.png
```

也可以是函数，但是如果是函数形式，返回的就是完整的url，而不是路径名称。会覆盖outputPath自定义函数的返回值。所以对于自定义函数来说，这两个只要设置一个即可
```js
rules: [
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'file-loader',
    options: {
      publicPath: (url, resourcePath, context) => {
        // `resourcePath` is original absolute path to asset 文件的绝对路径
        // `context` is directory where stored asset (`rootContext`) or `context` option  file-loader的context或者webpack的context

        // To get relative path you can use
        // const relativePath = path.relative(context, resourcePath);

        if (/my-custom-image\.png/.test(resourcePath)) {
          return `other_output_path/${url}`;
        }

        if (/images/.test(context)) {
          return `image_output_path/${url}`;
        }

        return `output_path/${url}`;
      },
    },
  },
],
```
4. emitFile 默认是true 如果为false则不会生成一个文件，而是只是将路径指向文件。在本地开发时，设成false可以加快构建速度

5. postTransformPublicPath 动态的公共路径

有时候公共路径是根据环境的变化而变化的，所以就需要配置动态的公共路径
```js
{
  test: /\.(png|jpg|gif)$/i,
  loader: 'file-loader',
  options: {
    publicPath: '/some/path/',
    postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
  },
},
```

官方给的列子
main.js
```js
const namespace = process.env.NAMESPACE;
const assetPrefixForNamespace = (namespace) => {
  switch (namespace) {
    case 'prod':
      return 'https://cache.myserver.net/web';
    case 'uat':
      return 'https://cache-uat.myserver.net/web';
    case 'st':
      return 'https://cache-st.myserver.net/web';
    case 'dev':
      return 'https://cache-dev.myserver.net/web';
    default:
      return '';
  }
};
__webpack_public_path__ = `${assetPrefixForNamespace(namespace)}/`;
```
webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'static/assets/',
          publicPath: 'static/assets/',
          postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
        },
      },
    ],
  },
};
```
