#### url-loader
用法和file-loader类似，只是多了没有超出大小限制的文件，会被转成base64功能

配置如下：
1. limit
限制文件大小，多少以下可以转成base64.也可以为boolean，若为false，则不会转成base64

2. 其他设置参考file-loader