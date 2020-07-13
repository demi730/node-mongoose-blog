const express = require('express')
const md5 = require('blueimp-md5')

const User = require('./models/user')
const Topic = require('./models/topic')
const Comment = require('./models/comment')
const router = express.Router()

router.get('/',async (req,res) => {
    try {
        const data = await Topic.find({})
        res.render('index.html',{
            user:req.session.user,
            topics:data
        })
    }catch (e) {
        throw e
    }
})

router.get('/login',(req,res) => {
    res.render('login.html')
})
router.post('/login',async (req,res) => {
    const body = req.body
    try {
        const email = await User.findOne({email:body.email})
        if (!email){
            return res.status(200).json({
                err_code:1,
                message:'Email is invalid!'
            })
        }
        const user = await User.findOne({email:body.email,password:md5(md5(body.password))})
        if(!user){
            return  res.status(200).json({
                err_code:2,
                message:'password is invalid!'
            })
        }
        req.session.user = user
        res.status(200).json({
            err_code:0,
            message:'OK'
        })
    }catch (e) {
        return res.status(500).json({
            err_code:500,
            message:'Server error'
        })
    }
})

router.get('/logout',(req,res) => {
    //清除session数据
    req.session.user = null
    res.redirect('/login')
})

router.get('/register',(req,res) => {
    res.render('register.html')
})
router.post('/register',async (req,res) => {
    const body = req.body
    try {
        const data = await User.findOne({email: body.email})
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email already exit'
            })
        }
        //使用MD5对密码进行双重加密
        body.password = md5(md5(body.password))
        const user = await new User(body).save()
        req.session.user = user
        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    } catch (e) {
        return res.status(500).json({
            err_code: 500,
            message: 'Server error'
        })
    }
})

router.get('/topics/new',(req,res) => {
    res.render('topic/new.html',{
        user:req.session.user
    })
})
router.post('/topics/new',async (req,res) => {
    const body = req.body
    body["email"] = req.session.user.email
    body["nickname"] = req.session.user.nickname
    try {
        await new Topic(body).save()
        res.status(200).json({
            err_code:0,
            message:'OK'
        })
    }catch (e) {
        return res.status(500).json({
            err_code:500,
            message:e.message
        })
    }
})

router.get('/topics/show',async (req,res) => {
    const id = (req.query.id).replace(/\"/g,"")
    try {
        const topic = await Topic.findOne({_id:id})
        const comments = await Comment.find({articleId:id})
        res.render('topic/show.html',{
            comments:comments,
            topic:topic,
            user:req.session.user
        })
    }catch (e) {
        throw e
    }
})
router.post('/topics/show',async (req,res) => {
    const body = req.body
    const articleId = body.articleId.replace(/\"/g,"")
    try {
        const data = await Topic.findOne({_id:articleId})
        const comment = {}
        comment.articleId = articleId
        comment.email = data.email
        comment.nickname = req.session.user.nickname
        comment.comments = body.comments
        await new Comment(comment).save()
        res.status(200).json({
            err_code:0,
            message:'OK'
        })
    }catch (e) {
        res.status(500).json({
            err_code: 500,
            message: e.message
        })
    }
})

router.get('/settings/admin',(req,res) => {
    res.render('settings/admin.html',{
        user:req.session.user
    })
})
router.post('/settings/admin',async (req,res) => {
    const body = req.body
    const newPassword = md5(md5(body.checkPassword))
    try {
        await User.updateOne(
            {email:req.session.user.email},
            {
                $set:{"password":newPassword},
                $currentDate : { "lastModified": true }
            })
        res.status(200).json({
            err_code:0,
            message:'OK'
        })
    }catch (e) {
        return res.status(500).json({
            err_code:500,
            message:e.message
        })
    }
})

router.get('/settings/profile',(req,res) => {
    res.render('settings/profile.html',{
        user:req.session.user
    })
})
router.post('/settings/profile',async (req,res) => {
    const body = req.body
    try {
        await User.updateOne(
            {email:req.session.user.email},
            {
                $set:{"nickname":body.nickname,"bio":body.bio,"gender":body.gender,"birthday":body.birthday},
                $currentDate : { "lastModified": true }
            })
        res.status(200).json({
            err_code:0,
            message:'OK'
        })
    }catch (e) {
        return res.status(500).json({
            err_code:500,
            message:e.message
        })
    }
})

router.get('/settings/delete',async (req,res) => {
    try {
        await User.deleteOne({email:req.session.user.email})
        res.status(200).json({
            err_code:0,
            message:'OK'
        })
        req.session.user = null
    }catch (e) {
        return res.status(500).json({
            err_code:500,
            message:e.message
        })
    }
})

module.exports = router