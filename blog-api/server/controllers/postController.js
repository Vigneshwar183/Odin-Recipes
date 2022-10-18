const async = require('async');
const mongoose = require('mongoose');
const Post = require('../models/post');
const {body, validationResult} = require('express-validator');

exports.post_form_post = [
    body('title').trim().isLength({min:1}).escape(),
    body('post').trim().isLength({min:1}).escape(),

    (req, res, next)=>{
        const errors = validationResult(req);
        console.log(req.body)
        if (!errors.isEmpty()){
            res.json({user: null, error: errors})
        }else{
        var post = new Post({
            title: req.body.title,
            author: req.body.userId,
            createdAt: Date.now(),
            published: false,
            comments: [],
            post : req.body.post
        })
        post.save((err)=>{
            if (err){
                return next(err)
            }
            res.json({post: post})
        })
        }      
    }
]

exports.post_list_get = (req, res, next)=>{
    Post.find({published: 'true'}).sort({date: 1}).populate('author').exec((err, posts)=>{
        if (err){
            return next(err)
        }
        res.json({posts: posts})
    })
}

exports.post_list_user_get = (req, res, next)=>{
    Post.find({author: req.body.userId}).sort({date:1}).populate('author').populate({path:'comments',populate:{path:'author'}}).exec((err,posts)=>{
        if (err){
            return next(err)
        }
        res.json({posts: posts})
    })
}

exports.post_get = async(req, res, next)=>{
    Post.find({_id:req.body.postId}).populate('author').populate({path:'comments',populate:{path:'author'}}).exec((err, post)=>{
        if (err){
            return next(err)
        }
        res.json({posts: post})
    }
    )
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
    Post.findByIdAndUpdate(req.body.postId, post, {}, (err)=>{
        if (err){
            return next(err)
        }
        res.json({post: post})
    })
}