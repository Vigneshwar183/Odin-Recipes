const async = require('async')
const express = require('express')
const passport = require('passport')
const app = require('../app')
const router = express.Router();

router.get('/login/facebook', 
    passport.authenticate('facebook'),
    function(req, res){
        if(req.user){
            res.redirect('http://localhost:3001/'+req.user._id+'/')
        } else{
            res.redirect('/')
        }
    }
)

module.exports = router