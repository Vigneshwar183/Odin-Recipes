const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userController = require('../controllers/userController');

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {session: false}, (err, user, info)=>{
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
            const token = jwt.sign(user, 'secret_key');
            return res.json({user, token})
        })
    })(req, res)
})

router.post('/sign_up', userController.sign_up_post)

router.post('/a', (req, res, next)=>{
    res.json({'user':'user'})
})

module.exports = router