const async = require('async')
const express = require('express')
const passport = require('passport')
const app = require('../app')
const router = express.Router();

router.get('/login/facebook', passport.authenticate('facebook',{
    successRedirect:'/',
    failureRedirect:'/auth/login/facebook'
}))

module.exports = router