# node-mongodb-demo
基于NodeJs+express+mongoose+bootstrap实现客户端博客网站的基本功能
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
## 路由设计

| 路径      | 方法 | get参数   | post参数               | 备注         |
| --------- | ---- | -------  | ---------------------- | ------------ |
| /         | get  |user,topic|                        | 首页         |
| /register | get  |          |                        | 注册页面     |
| /register | post |          | user                   | 处理注册请求 |
| /login    | get  |          |                        | 登录页面     |
| /login    | post |          | user                   | 处理登录请求 |
| /logout   | get  |          |                        | 处理用户退出 |
| /topics/new | get |         |                        |  发博客页面     |
|/topics/new|post||user,topic|处理发博客请求|
|/topics/show|get|||显示博客文章页面|
|/topics/show|post||user,topic,comment|处理显示博客文章请求|
|/settings/admin|get|||基本信息页面|
|/settings/admin|post||user|处理修改基本信息请求|
|/settings/profile|get|||账户信息页面|
|/settings/profile|post||user|处理修改账户信息请求|
|/settings/delete|get|user||处理注销账户请求|
