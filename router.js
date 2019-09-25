var express = require('express')
var md5 = require('blueimp-md5')
var User = require('./models/user')

var router = express.Router()

router.get('/',function(req,res){
    res.render('index.html',{
        user:req.session.user
    })
})

router.get('/login',function(req,res){
    res.render('login.html')
})
router.post('/login',function(req,res){
    var body = req.body
    User.findOne({email:body.email,password:md5(md5(body.password))}
    ,function(err,user){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        else if(!user){
            return  res.status(200).json({
                err_code:1,
                message:'Email or password is invalid!'
            })
        }
        //邮箱密码正确，登陆成功
            req.session.user = user
            res.status(200).json({
                err_code:0,
                message:'OK'
            })
        })
})
router.get('/logout',function(req,res){
    //清除session数据
    req.session.user = null
    res.redirect('/login')
})

router.get('/register',function(req,res){
    res.render('register.html')
})
router.post('/register',function(req,res){
    var body = req.body
    // try {
    //     if(await User.findOne({email:body.email})){
    //         return res.status(200).json({
    //             err_code: 1,
    //             message: 'Email has already exist!'
    //         })
    //     }
    //     if(await User.findOne({nickname:body.nickname})){
    //         return res.status(200).json({
    //             err_code: 2,
    //             message: 'Nickname has already exist!'
    //         })
    //     }
    //     //md5双重加密
    //     body.password = md5(md5(body.password))
    //     await new User(body).save()
    //     res.status(200).json({
    //         err_code: 0,
    //         message: 'OK'
    //     })
    // } catch(err){
    //     res.status(500).json({
    //         err_code: 500,
    //         message: err.message
    //     })
    // }
    User.findOne({
        $or:
        [
            {
                email:body.email
        },
            {
                nickname:body.nickname
            }
        ]
    }, function(err,data){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:'Server error'
            })
        }
        if(data){
            return res.status(200).json({
                err_code:1,
                message: 'Email or nickname already exit'
            })
        }
        //使用MD5对密码进行双重加密
        body.password = md5(md5(body.password))
        new User(body).save(function(err,data){
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'Server error'
                })
            }
            req.session.user = data
            res.status(200).json({
                err_code:0,
                message:'OK'
            })
        })
    })
})

module.exports = router