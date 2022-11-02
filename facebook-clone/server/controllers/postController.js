const Post = require('../models/Post')
const User = require('../models/User')
const async = require('async')
const {body, validationResult} = require('express-validator')

exports.createPost = [
    body('post').trim().isLength({min:1}).escape(),

    (req, res, next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({error: errors})
        } else {
            var post = new Post({
                author: req.body.userId,
                post: req.body.post,
                comments: [],
                createdAt: Date.now(),
                likes: 0
            })

            post.save((err)=>{
                if (err){
                    return next(err)
                }
            
            User.findOneAndUpdate({_id:req.body.userId},{$push:{posts:post}}).exec((err, posts)=>{
                if (err) return next(err)
                User.findById(req.body.userId).exec((err, user)=>{
                    if (err) return next(err)
                    res.json({user:user})
                })
            })
            })
        }
    }
]

exports.getPost = (req, res, next)=>{
    console.log(req.body.userId)
    Post.find({author: req.body.userId}).sort({createdAt:1}).populate('author').exec((err, posts)=>{
        if (err) return next(err)
        res.json({posts: posts})
    })
}