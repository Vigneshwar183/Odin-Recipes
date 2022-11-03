const async = require('async');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const {body, validationResult} = require('express-validator');

exports.createComment = (req, res, next)=>{
    var comment = new Comment({
        author: req.body.userId,
        post: req.body.postId,
        comment: req.body.comment,
        createdAt: Date.now()
    })
    comment.save((err)=>{
        if (err) return next(err)
    })

    Post.findOneAndUpdate({_id:req.body.postId},{$push:{comments:comment}}).exec((err,posts)=>{
        if (err) return next(err)
        res.json({message:'done'})
    })
}

exports.viewComment = (req, res, next)=>{
    Comment.find({post:req.body.postId}).sort({createdAt:1}).populate('author').exec((err, comments)=>{
        if (err) return next(err)
        res.json({comments:comments})
    })
}