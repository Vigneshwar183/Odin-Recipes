const async = require('async');
const mongoose = require('mongoose');
const Post = require('../models/post');
const {body, validationResult} = require('express-validator');

exports.post_form_post = [
    body('title').trim().isLength({min:1}).escape(),
    body('author').trim().isLength({min:1}).escape(),
    body('post').trim().isLength({min:1}).escape(),

    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.json({user: null, error: errors})
        }
        var post = new Post({
            title: req.body.title,
            author: req.user._id,
            createdAt: Date.now(),
            published: false,
            comments: null,
            post : req.body.post
        })
        post.save((err)=>{
            if (err){
                return next(err)
            }
            res.json({post: post})
        })
    }
]

exports.post_list_get = (req, res, next)=>{
    Post.find({published: true}).sort({date: 1}).populate('author').exec((err, posts)=>{
        if (err){
            return next(err)
        }
        res.json({posts: posts})
    })
}

exports.post_list_user_get = (req, res, next)=>{
    Post.find({author: req.body.userId}).sort({date:1}).populate('author').exec((err,posts)=>{
        if (err){
            return next(err)
        }
        res.json({posts: posts})
    })
}

exports.post_get = (req, res, next)=>{
    Post.findById(req.body.postId).exec((err, post)=>{
        if (err){
            return next(err)
        }
        res.json({posts: post})
    })
}

exports.post_delete = (req, res, next)=>{
    Post.findByIdAndDelete(req.body.postId).exec((err)=>{
        if (err){
            return next(err)
        }
        res.json({post: post})
    })
}

exports.post_publish = async(req, res, next)=>{
    console.log(typeof req.body.postId)
    const post = await Post.findById(req.body.postId)
    console.log(post)
    post.published = true
    post.publishedAt = Date.now()
    console.log(post)
    Post.findByIdAndUpdate(req.body._id, post, {}, (err)=>{
        if (err){
            return next(err)
        }
        res.json({post: post})
    })
}