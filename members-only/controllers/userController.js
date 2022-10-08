const async = require('async')
const User = require('../models/user')
const Post = require('../models/posts')
const mongoose = require('mongoose')
const {body, validationResult, validationErrors} = require('express-validator')
const brycpt = require('bcryptjs')
const userModel = require('../models/user')
const passport = require('passport')
const localStrategy = require('passport-local')
require('dotenv').config()

exports.index_get = async (req, res, next)=>{
    var result= await Post.find().sort({date: 1}).populate('user')
    if (result){
        res.render('index', {title: 'Home', user: req.user, posts: result})
    } else {
        res.render('index', {title: 'Home',user: req.user, posts: null})
    }
}

exports.index_post = (req, res, next)=>{
    res.send('Not implemented')
}

exports.sign_up_get= (req, res, next)=>{
    res.render('sign-up',{title: 'Sign Up'})
}

exports.sign_up_post = [
    body('first_name', 'Fist name must not be empty')
        .trim()
        .isLength({min:3})
        .escape(),
    body('last_name', 'Last name must not be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    body('username', 'username')
        .isLength({min:3}),
    body('password')
        .custom((value,{req})=>{
            if (value===req.body.confirm_password){
                return true;
            } else {
                return false
            }
        }),
    async (req, res, next)=>{
        const errors = validationResult(req)
        const usernameExists =await User.findOne({username: req.body.username})
        if (usernameExists){
            const error= new Error('Username exists')
            error.statusCode= 400
            error.msg= 'Username exists'
            console.log(error.message)
            errorArray=[]
            errorArray.push(error)
            console.log(errorArray)
            res.render('sign-up',{title: 'Sign up', errors:errorArray})
        } else if (!errors.isEmpty()){
            res.render('sign-up',{title: 'Sign up', errors:errors.array()})
        }
        else{
            brycpt.hash(req.body.password,10,(err,hashedPassword)=>{
                if (err){
                    return next(err)
                }
                var user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: hashedPassword,
                    username: req.body.username,
                    membershipStatus: false,
                    admin: false
                })
                user.save((err)=>{
                    if (err){
                        return next(err)
                    }
                    res.redirect('/login')
                })
            })
        }
    }
]

exports.login_get = (req, res, next)=>{
    res.render('login', {title: 'Login'})
}

exports.login_post = passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login'
})

exports.logout = (req, res, next)=>{
    req.logout(function(err){
        if (err){
            return next(err)
        }
        res.redirect('/')
    })
}

exports.member_form_get = (req, res, next)=>{
    if (!res.locals.user){
        return res.redirect('/login')
    }
    res.render('member_form', {title: 'Member Form', user: res.locals.user})
}

exports.member_form_post = (req, res, next)=>{
    if (req.body.membercode != process.env.membercode){
        var error = new Error('Member code error')
        error.msg = 'Incorrect member code'
        res.render('member_form', {title: 'Member form', user: res.locals.user, error: error})
    }
    var user = new User(res.locals.user)
    user.membershipStatus = true
    User.findByIdAndUpdate(res.locals.user._id, user, {}, (err)=>{
        if (err){
            return next(err)
        }
        res.redirect('/')
    })
}

exports.admin_form_get = (req, res, next)=>{
    if (!res.locals.user){
        res.redirect('/login')
    }
    res.render('admin_form', {title: 'Admin form', user: res.locals.user})
}

exports.admin_form_post = [
    body('passcode', 'passocode cannot be empty').trim().isLength({min:1}),
    (req, res, next)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            res.render('admin_form', {title: 'Admin Form', user:res.locals.user, errors: errors.array()})
        }   else if (req.body.passcode!= process.env.admincode){
            var error = new Error('Passcode error')
            error.msg = 'Incorrect Passcode'
            var errorArray = []
            errorArray.push(error)
            res.render('admin_form', {title: 'Admin Form', user:res.locals.user, errors:errorArray})
        }
        var user= new User(res.locals.user)
        user.admin= true
        user.membershipStatus= true
        User.findByIdAndUpdate(res.locals.user._id, user, {}, (err)=>{
            if (err){
                return next(err)
            }
            res.redirect('/')
        })
        
    }
]