const async = require('async')
const User = require('../models/User')

exports.getUserData = (req, res ,next)=>{
    User.findById(req.body.id).exec((err, user)=>{
        if (err) return next(err)
        res.json({user: user})
    })
}

exports.getUserNotifications = (req, res, next) =>{
    User.findById(req.body.id).populate({path:'notifications', populate:{path:'author'}}).exec((err, user)=>{
        if (err) return next(err)
        res.json({user:user})
    })
}

exports.friendRequest = async(req, res, next) =>{
    const user = await User.findById(req.body.userId)
    const friend = await User.findById(req.body.friendId)
    
    if (req.body.decision === 'accept'){
        user.friendList.push(req.body.friendId)
        friend.friendList.push(req.body.userId)
        User.findById(req.body.friendId).exec((err, user)=>{
            if (err) return next(err)
        })
        User.findById(req.body.id).populate({path:'notifications', populate:{path:'author'}}).exec((err, user)=>{
            if (err) return next(err)
            res.json({message:'friend request accepted', user: user})
        })
    } else {
        res.json({message:'friend request rejected'})
    }
}

exports.getFriends = async(req, res, next)=>{
    User.findById(req.body.id).populate({path:'friendList', populate:{path:'author'}}).exec((err, friendList)=>{
        if (err) return next(err)
        res.json({friendList: friendList})
    })
}