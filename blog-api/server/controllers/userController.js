const async = require('async');
const User = require('../models/user');
const mongoose = require('mongoose');
const {body, validationErrors, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');

exports.sign_up_post = [
    body('firstName').trim().isLength({min:1}).escape(),
    body('secondName').trim().isLength({min:1}).escape(),
    body('username').trim().isLength({min:1}).escape(),

    async (req, res, next)=>{
        const errors = validationResult(req);
        const usernameExists = await User.findOne({username: req.body.username})
        console.log(req.body);
        if (usernameExists){
            const error = new Error('username exists');
            error.msg = 'username exists';
            error.status = 400;
            res.json({user: null, error: error})
        } else if (!errors.isEmpty()){
            res.json({user:false, error: errors})
        } else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
                if (err){
                    return next(err)
                } 
                var user = new User({
                    firstName: req.body.firstName,
                    secondName: req.body.secondName,
                    username: req.body.username,
                    password: hashedPassword
                })
                user.save((err)=>{
                    if (err){
                        return next(err)
                    }
                    res.json({user:user})
                })
            })
        }
    }
]