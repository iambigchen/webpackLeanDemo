  ### [demo](https://github.com/iambigchen/webpackLeanDemol)
* Entry
    * context

        Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。
        ```js
        module.exports = {
            context: path.resolve(__dirname, 'app')
        }
        ```
        
    * entry

        有三种形式
        1. './app/entry' 入口模块的文件路径，可以是相对路径。
        2. ['./app/entry1', './app/entry2'] 入口模块的文件路径
        3. { a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']} 配置多个入口，每个入口生成一个 Chunk

        数组形式入口，并不会打成多个chunk，而是生成一个chunk

        chunk名称
        * 如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
        * 如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称。

        动态entry
        * 同步函数
        ```js
        entry: () => {
            return {
                a:'./pages/a',
                b:'./pages/b',
            }
        };
        ```
        * 异步函数
        ```js
        entry: () => {
            return new Promise((resolve)=>{
                resolve({
                a:'./pages/a',
                b:'./pages/b',
                });
            });
        };
        ```

* Output
    * filename
    
        输出文件的名称，为string 类型.如果只有一个输出文件，则可以把它写成静态.但是在有多个 Chunk 要输出时，就需要借助模版和变量了

        `filename: '[name].js'`

        除了name变量，还有以下变量

        1. id          Chunk 的唯一标识，从0开始
        2. name        Chunk 的名称(entry配置的，如果entry是string，或array则name = main)
        3. hash        Chunk 的唯一标识的 Hash 值
        4. chunkhash   Chunk 内容的 Hash 值

        其中 hash 和 chunkhash 的长度是可指定的，[hash:8] 代表取8位 Hash 值，默认是20位。
    
    * chunkFilename

        配置无入口的 Chunk 在输出时的文件名称.chunkFilename 支持和 filename 一致的内置变量。
    
    * path

        配置输出文件存放在本地的目录，必须是 string 类型的绝对路径

        ```js
        output: {
            path: path.resolve(__dirname, 'dist')
        }
        ```

    * publicPath

        在复杂的项目里可能会有一些构建出的资源需要异步加载，加载这些异步资源需要对应的 URL 地址。

        output.publicPath 配置发布到线上资源的 URL 前缀，为string 类型。 默认值是空字符串 ''，即使用相对路径

        ```js
        publicPath: 'https://cdn.example.com/assets/'
        ```

        output.path 和 output.publicPath 都支持字符串模版，内置变量只有一个：hash 代表一次编译操作的 Hash 值。

    * crossOriginLoading

        Webpack 输出的部分代码块可能需要异步加载，而异步加载是通过 JSONP 方式实现的。 JSONP 的原理是动态地向 HTML 中插入一个 <script src="url"></script> 标签去加载异步资源。 output.crossOriginLoading 则是用于配置这个异步插入的标签的 crossorigin 值。

        anonymous(默认) 在加载此脚本资源时不会带上用户的 Cookies；

        use-credentials 在加载此脚本资源时会带上用户的 Cookies。
    
    * libraryTarget 和 library

        当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们。

        output.libraryTarget 配置以何种方式导出库。 output.library 配置导出库的名称。

        * libraryTarget = var (默认) library = A

        ```html
        <script src="./dist/a.js"></script>
        <script>
            console.log(A)
        </script>
        ```
        
        * libraryTarget = assign (默认) library = A

        assign和var的区别是，如果全局已经`var A = 1`, var 则不会覆盖A  assign会覆盖A

        * commonjs

        `exports['LibraryName'] = lib_code;`

        * commonjs2

        `module.exports = lib_code;`

        * this window global

        `this['LibraryName'] = lib_code;`
        `window['LibraryName'] = lib_code;`
        `global['LibraryName'] = lib_code;`

        * amd
        
        ```js
        define([], function() {
            return _entry_return_;
        });
        ```

        * umd
        
        ```js
        (function webpackUniversalModuleDefinition(root, factory) {
            if(typeof exports === 'object' && typeof module === 'object')
            module.exports = factory();
            else if(typeof define === 'function' && define.amd)
            define([], factory);
            else if(typeof exports === 'object')
            exports["MyLibrary"] = factory();
            else
            root["MyLibrary"] = factory();
            })(typeof self !== 'undefined' ? self : this, function() {
            return _entry_return_;
        });
        ```

        * jsonp

        会使用 jsonp 的方式把结果包裹起来

    * libraryExport
        output.libraryExport 配置要导出的模块中哪些子模块需要被导出。 它只有在 output.libraryTarget 被设置成 commonjs 或者 commonjs2 时使用才有意义。
        ```js
            export const a=1;
            export default b=2;
        ```
        现在你想让构建输出的代码只导出其中的 a，可以把 output.libraryExport 设置成 a

* Module

    * 配置Loader

        1. 条件匹配：通过 test 、 include 、 exclude 三个配置项来命中 Loader 要应用规则的文件。
        2. 应用规则：对选中后的文件通过 use 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。
        3. 重置顺序：一组 Loader 的执行顺序默认是从右到左执行，通过 enforce 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。

        ```js
        module: {
            rules: {
                test: /\.js$/,
                use: [
                    {
                        loader:'babel-loader?cacheDirectory=true', //俩种传参方式，一种放在loader后面，一种通过options
                        options:{
                            cacheDirectory:true,
                        },
                        // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
                        // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
                        enforce:'post'
                    },
                    // 省略其它 Loader
                ],
                // 只命中src目录里的js文件，加快 Webpack 搜索速度
                include: path.resolve(__dirname, 'src'),
                // 排除 node_modules 目录下的文件
                exclude: path.resolve(__dirname, 'node_modules'),
            }
        }
        ```

        ```js
        {
            test:[
                /\.jsx?$/,
                /\.tsx?$/
            ],
            include:[
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'tests'),
            ],
            exclude:[
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'bower_modules'),
            ]
        }
        ```
        数组里的每项之间是或的关系，即文件路径符合数组中的任何一个条件就会被命中。
    * noParse
        noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。 原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

        >注意被忽略掉的文件里不应该包含 import 、 require 、 define 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

        ```js
        resolve: {
            alias: {
            jquery$: path.resolve(__dirname, 'static/jquery.min.js')
            }
        },
        module: {
            noParse: /jquery/
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery'
            })
        ]
        ```
        提升了打包速度
    
    * parse

        因为 Webpack 是以模块化的 JavaScript 文件为入口，所以内置了对模块化 JavaScript 的解析功能，支持 AMD、CommonJS、SystemJS、ES6。 parser 属性可以更细粒度的配置哪些模块语法要解析哪些不解析，和 noParse 配置项的区别在于 parser 可以精确到语法层面， 而 noParse 只能控制哪些文件不被解析。

        ```js
        module: {
            rules: [
                {
                test: /\.js$/,
                use: ['babel-loader'],
                parser: {
                    amd: false, // 禁用 AMD
                    commonjs: false, // 禁用 CommonJS
                    system: false, // 禁用 SystemJS
                    harmony: false, // 禁用 ES6 import/export
                    requireInclude: false, // 禁用 require.include
                    requireEnsure: false, // 禁用 require.ensure
                    requireContext: false, // 禁用 require.context
                    browserify: false, // 禁用 browserify
                    requireJs: false, // 禁用 requirejs
                }
                },
            ]
        }
        ```

        parse是与noParse同级的属性，当然也可以嵌套到rules，表示针对与某个loader应用该属性的规则。

* Resolve
    * alias
        resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径
        alias 还支持 $ 符号来缩小范围到只命中以关键字结尾的导入语句

    * mainFields
        有一些第三方模块会针对不同环境提供几分代码。 例如分别提供采用 ES5 和 ES6 的2份代码，这2份代码的位置写在 package.json 文件里
        ```js
        {
            "jsnext:main": "es/index.js",// 采用 ES6 语法的代码入口文件
            "main": "lib/index.js" // 采用 ES5 语法的代码入口文件
        }
        ```
        Webpack 会根据 mainFields 的配置去决定优先采用那份代码，mainFields 默认如下：
        ```js
        mainFields: ['browser', 'main']
        ```
        想优先采用 ES6 的那份代码，可以这样配置
        ```js
        mainFields: ['jsnext:main', 'browser', 'main']
        ```

    * extensions

        导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
        ```js
        extensions: ['.ts', '.js', '.json']
        ```
    
    * modules

        resolve.modules 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找。有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样 import '../../../components/button' 这时你可以利用 modules 配置项优化，假如那些被大量导入的模块都在 ./src/components 目录下，把 modules 配置成

        ```js
        modules:['./src/components','node_modules']
        ```

        可以简单通过 import 'button' 导入
    
    * descriptionFiles

        resolve.descriptionFiles 配置描述第三方模块的文件名称，也就是 package.json 文件

        ```js
        descriptionFiles: ['package.json']
        ```

    * enforceExtension

        resolve.enforceExtension 如果配置为 true 所有导入语句都必须要带文件后缀， 例如开启前 import './foo' 能正常工作，开启后就必须写成 import './foo.js'。
    
    * enforceModuleExtension

        enforceModuleExtension 和 enforceExtension 作用类似，但 enforceModuleExtension 只对 node_modules 下的模块生效。在 enforceExtension:true 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 enforceModuleExtension:false 来兼容第三方模块。

*  DevServer
    
    * hot

        DevServer 默认的行为是在发现源代码被更新后会通过自动刷新整个页面来做到实时预览，开启模块热替换功能后将在不刷新整个页面的情况下通过用新模块替换老模块来做到实时预览。
    
    * inline

        1. 如果开启 inline，DevServer 会在构建完变化后的代码时通过代理客户端控制网页刷1. 

        2. 如果关闭 inline，DevServer 将无法直接控制要开发的网页。这时它会通过 iframe 的方式去运行要开发的网页，当构建完变化后的代码时通过刷新 iframe 来实现实时预览。 但这时你需要去 http://localhost:8080/webpack-dev-server/ 实时预览你的网页

    * historyApiFallback

        这会导致任何请求都会返回 index.html 文件，这只能用于只有一个 HTML 文件的应用。
        
        如果你的应用由多个单页应用组成，这就需要 DevServer 根据不同的请求来返回不同的 HTML 文件，配置如下：
        ```js
        historyApiFallback: {
            // 使用正则匹配命中路由
            rewrites: [
                // /user 开头的都返回 user.html
                { from: /^\/user/, to: '/user.html' },
                { from: /^\/game/, to: '/game.html' },
                // 其它的都返回 index.html
                { from: /./, to: '/index.html' },
            ]
        }
        ```
    
    * contentBase
        把项目根目录下的 public 目录设置成 DevServer 服务器的文件根目录

        ```js
            devServer:{
                contentBase: path.join(__dirname, 'public')
            }
        ```
        DevServer 服务器通过 HTTP 服务暴露出的文件分为两类

        1. 暴露本地文件
        2. 暴露 Webpack 构建出的结果，由于构建出的结果交给了 DevServer，所以你在使用了 DevServer 时在本地找不到构建出的文件。

        contentBase 只能用来配置暴露本地文件的规则，你可以通过 contentBase:false 来关闭暴露本地文件。
    
    * headers

        devServer.headers 配置项可以在 HTTP 响应中注入一些 HTTP 响应头.本地的html和js都会注入该响应头
    
    * host

        DevServer 服务监听的地址, 想要局域网中的其它设备访问你本地的服务，可以在启动 DevServer 时带上 --host 0.0.0.0
    
    * port

        配置 DevServer 服务监听的端口
    
    * allowedHosts

        配置一个白名单列表，只有 HTTP 请求的 HOST 在列表里才正常返回

        ```js
        allowedHosts: [
            // 匹配单个域名
            'host.com',
            'sub.host.com',
            // host2.com 和所有的子域名 *.host2.com 都将匹配
            '.host2.com'
        ]
        ```
    
    *  https

        切换成 HTTPS 服务

    * clientLogLevel

        配置在客户端的日志等级，这会影响到你在浏览器开发者工具控制台里看到的日志内容
    
    * compress

        是否启用 gzip 压缩

    * open

        启动且第一次构建完时自动用你系统上默认的浏览器去打开要开发的网页。 同时还提供 devServer.openPage 配置项用于打开指定 URL 的网页。

* 其他

    * target

        target 配置项可以让 Webpack 构建出针对不同运行环境的代码

        1. web                针对浏览器 (默认)，所有代码都集中在一个文件里
        2. node               针对 Node.js，使用 require 语句加载 Chunk 代码
        3. async-node         针对 Node.js，异步加载 Chunk 代码
        4. webworker          针对 WebWorker
        5. electron-main      针对 Electron 主线程
        6. electron-renderer  针对 Electron 渲染线程

        当你设置 target:'node' 时，源代码中导入 Node.js 原生模块的语句 require('fs') 将会被保留，fs 模块的内容不会打包进 Chunk 里。
    
    * devtool

        为构建出的代码生成 Source Map 以方便调试 `devtool: 'source-map'`

    * watch

        监听模式 
    
    * watchOption

        * ignored

            不监听的文件或文件夹，支持正则匹配 `/node_modules/`
        
        * aggregateTimeout

            `aggregateTimeout: 300` 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        
        * poll
            
            `poll: 1000` 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的 默认每隔1000毫秒询问一次
    
    * Externals

        告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。

        如果代码中已经全局引入jq
        ```js
        <script src="path/to/jquery.js"></script>
        ```
        并且模块化引入了jq
        ```js
        import $ from 'jquery';
        $('.my-element');
        ```
        这里jq会被打包两次，为了解决这种情况，可以如下配置
        ```js
        externals: {
            // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
            jquery: 'jQuery'
        }
        ```
    * ResolveLoader

        告诉 Webpack 如何去寻找 Loade  该配置项常用于加载本地的 Loader
        ```js
        resolveLoader:{
            // 去哪个目录下寻找 Loader
            modules: ['node_modules'],
            // 入口文件的后缀
            extensions: ['.js', '.json'],
            // 指明入口文件位置的字段
            mainFields: ['loader', 'main']
        }
        ```

* 多种配置类型

  ```js
  module.exports = function () {
    return {

    }
  }

  module.exports = function () {
    return new Promise(resolve => {
      resolve({})
    })
  }

  module.exports = [function () {
    return new Promise(resolve => {
      resolve({})
    })
  }, function () {
    return {

    }
  }]
  ```