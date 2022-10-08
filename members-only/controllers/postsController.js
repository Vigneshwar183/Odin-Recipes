const async = require('async')
const mongoose = require('mongoose')
const Post = require('../models/posts')
const {body, validationResult} = require('express-validator')

exports.create_posts_get = (req, res, next)=>{
    if (!res.locals.user){
        res.direct('/login')
    }
    res.render('post_form', {title: 'Create Post', user: res.locals.user})
}

exports.create_posts_post = [
    body('name', 'Name must not be empty').trim().isLength({min:1}),
    body('post', 'post must not be empty').trim().isLength({min:1}),
    (req, res, next)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            res.render('post_form',{title: 'Create Posts', errors: errors.array()})
        }
        const post = new Post({
            user: req.user._id,
            name: req.body.name,
            post: req.body.post,
            date: Date.now()
        })
        post.save((err)=>{
            if (err){
                return next(err)
            }
            res.redirect('/')
        })
    }
]

exports.delete_post = (req, res, next)=>{
    Post.findByIdAndRemove(req.body.postId, function deletePost(err){
        if (err) {
            return next(err)
        }
        res.redirect('/');
    })
}