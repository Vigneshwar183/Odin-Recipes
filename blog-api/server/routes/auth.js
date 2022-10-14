const async = require('async');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userController = require('../controllers/userController');
const User = require('../models/user');
require('dotenv').config();

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {session: false}, async(err, user)=>{
        if (err || !user){
            return res.status(400).json({
                message: 'Error',
                user: user
            });
        }
        req.login(user, {session: false},(err)=>{
            if (err){
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), process.env.jwtsecret);
            return res.json({user:user, token: token})
        })
    })(req, res)
})

router.post('/sign_up', userController.sign_up_post)

module.exports = router