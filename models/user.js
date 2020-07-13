const mongoose = require('mongoose')
const db = require('./db')
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        //这里不能写Date.now()，因为会即刻调用,
        // 这里给了一个方法Date.now
        // 当new model的时候，如果没有传递created_time属性，mongoose就会调用该方法
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1,0,1],
        default: -1
        //-1 男
        // 0 保密
        // 1 女
    },
    status: {
        type: Number,
        //用户权限限制
        //0 没有限制
        // 1 不能评论
        // 2 不能登录
        enum:[0,1,2],
        default: 0
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User