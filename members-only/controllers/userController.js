const async = require('async')
const User = require('../models/user')
const Post = require('../models/posts')
const {body, validationResult, validationErrors} = require('express-validator')
const brycpt = require('bcryptjs')
const userModel = require('../models/user')

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
    (req, res, next)=>{
        const errors = validationResult(req)
        console.log(req.body)
        if (!errors.isEmpty()){
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

exports.login_post = (req, res, next)=>{
    res.send('not implemented')
}