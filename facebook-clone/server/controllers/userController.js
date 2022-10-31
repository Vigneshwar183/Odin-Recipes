const async = require('async')
const User = require('../models/User')

exports.getUserData = (req, res ,next)=>{
    User.findById(req.body.id).exec((err, user)=>{
        console.log(req.body.id)
        if (err) return next(err)
        res.json({user: user})
    })
}