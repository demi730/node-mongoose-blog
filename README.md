# node-mongodb-demo
node+express+mongodb实现登录注册退出功能API接口文档
## 安装
* [node.js安装配置](https://www.runoob.com/nodejs/nodejs-install-setup.html)
* [mongodb安装配置](https://www.runoob.com/mongodb/mongodb-window-install.html)
## 启动 mongodb 数据库
1. 打开cmd命令行输入`mongod`启动mongodb数据库
2. 再打开一个cmd命令行输入`mongo`连接mongodb数据库
## 安装接口项目依赖
在终端中进入接口项目目录并执行以下命令
```
npm install
```
## 启动接口服务
```
node app.js
```
成功启动后输入网址127.0.0.1:3000测试接口
## 注意
接口服务默认占用 3000 端口，如果 3000 端口被占用，解决方式如下：
* 方式一：关闭其他占用 3000 端口的服务
* 方式二：修改项目中的 app.js 文件中的端口号配置
```
app.listen(3000,function(){
    console.log('The server is running...')
})
```
