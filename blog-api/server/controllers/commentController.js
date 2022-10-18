const async = require('async');
const mongoose = require('mongoose');
const User = require('../models/user')
const Post = require('../models/post');
const Comment = require('../models/comment');
const {body, validationResult} = require('express-validator');

exports.comment_post = [
    body('comment').trim().isLength({min:1}).escape(),

    async (req, res, next)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return next(err)
            
        }
        var comment = new Comment({
            author: req.body.userId,
            post: req.body.postId,
            comment: req.body.comment,
            date: Date.now()
        })
        
        comment.save((err)=>{
            if (err) return next(err)
        })
        
        Post.findOneAndUpdate({_id:req.body.postId},{$push:{comments:comment}}).exec((err,posts)=>{
            if (err) return next(err)
            Post.find({_id:req.body.postId}).populate('author').populate({path:'comments',populate:{path:'author'}}).exec((err, post)=>{
                if (err){
                    return next(err)
                }
                res.json({posts: post})
            })
        })

        
    }
]

exports.comment_list_get = (req, res, next)=>{
    Comment.find({post: req.body.postId}).sort({date:1}).populate('author').exec((err, comments)=>{
        if (err) return next(err)
        res.json({comments: comments})
    })
}

exports.comment_delete = (req, res, next)=>{
    Comment.findByIdAndDelete(req.body.commentId).exec((err, comment)=>{
        if (err) return next(err)
        res.json({comment: comment})
    })
}