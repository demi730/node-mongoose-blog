const express = require('express')
const template = require('art-template')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const router = require('./router')

const app = express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules')))

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views'))//默认就是./views目录，可不写

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',//配置加密字符串，他会在原有加密基础上加上这个字符串去加密，增加安全性
    resave: false,
    saveUninitialized: true//无论你是否使用session都默认分配一把钥匙
}))

app.use(router)

//注册一个过滤器 通过处理时间戳 转为日期格式
template.defaults.imports.getDate = dateTime =>{
    const datetime = new Date(dateTime)

    const year = datetime.getFullYear()
    const month = ("0" + (datetime.getMonth() + 1)).slice(-2)
    const date = ("0" + datetime.getDate()).slice(-2)
    const hour = ("0" + datetime.getHours()).slice(-2)
    const minute = ("0" + datetime.getMinutes()).slice(-2)

    return  year + "-"+ month +"-"+ date +" "+ hour +":"+ minute
}

app.listen(3000,function(){
    console.log('The server is running...')
})