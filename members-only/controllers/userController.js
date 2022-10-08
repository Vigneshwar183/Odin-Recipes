const async = require('async')
const User = require('../models/user')
const Post = require('../models/posts')
const {body, validationResult, validationErrors} = require('express-validator')
const brycpt = require('bcryptjs')
const userModel = require('../models/user')
const passport = require('passport')
const localStrategy = require('passport-local')

exports.index_get = (req, res, next)=>{
    res.render('index', {title: 'Home', user: req.user})
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
                    membershipStatus: false
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