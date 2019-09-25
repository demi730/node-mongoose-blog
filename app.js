var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
var router = require('./router')

var app = express()

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

app.listen(3000,function(){
    console.log('The server is running...')
})