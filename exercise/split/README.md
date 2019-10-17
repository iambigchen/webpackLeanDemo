#### 代码分割与懒加载
对于单入口文件项目，需要对第三方依赖，webpack运行代码，自定义的公共模块进行一个代码的分割，必要时，也需要进行懒加载。从而达到优化的效果

chunkName要生效，记得在webpack的output中配置chunkFilename

##### require.ensure

require.ensure四个参数含义：
1. []: dependencies 引入模块，但不执行模块
2. callback: 在该回掉中执行
3. errorCallback: 引入失败的回掉
4. chunkName

```js
// requireEnsure.js
require.ensure([], function() {
  var _ = require('lodash')
}, 'lodash')

require.ensure(['./common/A'], function() {
  var A = require('./common/A')
}, 'A')

require.ensure(['./common/B'], function() {
  var subPageB = require('./common/B')
}, 'B')
```

通过上面的引入，打包后文件有四个，A，B，lodash和requireEnsure四个模块代码都被单独打成一个chunk，实现了代码的分割。并且通过jsonp的形式实现了异步加载


##### require.include
如果对于子模块A，B都依赖了模块C，也可以在A，B的父模块通过require.include先引入C

```js
require.include('./common/childCommon/C')
require.ensure([], function() {
  var _ = require('lodash')
}, 'lodash')

require.ensure(['./common/A'], function() {
  var A = require('./common/A')
}, 'A')

require.ensure(['./common/B'], function() {
  var subPageB = require('./common/B')
}, 'B')
```

##### 动态import
es6提供了动态import的方式

可以通过webpack注释的形式，定义chunkName

```js
import(/* webpackChunkName: 'subPageA' */ './commonByImport/A').then(A => {
  console.log(A)
})

import(/* webpackChunkName: 'subPageB' */ './commonByImport/B').then(B => {
  console.log(B)
})
```

##### 结合CommonsChunkPlugin把异步加载的代码分割出来
如果是动态import或者require.ensure进来的代码，都是异步加载的，所以CommonsChunkPlugin不能直接打包出来

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    minChunks: 2, 
    children: true, // 不只是入口文件，入口文件的子文件也提取
    async: 'async-common' // 可以为ture， 也可以为chunk名
  }),

  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manmifest'],
    minChunks: Infinity
  })
]
```