const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
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
                likedBy: []
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
    Post.find({author: req.body.userId}).sort({createdAt:1}).populate('author').exec((err, posts)=>{
        if (err) return next(err)
        res.json({posts: posts})
    })
}

exports.likeDislikePost = async(req, res, next) =>{
    const post = await Post.findById(req.body.postId)

    if (req.body.like){
        post.likedBy.push(req.body.userId)
        Post.findByIdAndUpdate(post._id, post, {}, (err, temp)=>{
            if (err) return next(err)
            Post.findById(post._id).populate('author').exec((err, post)=>{
                if (err) return next(err)
                res.json({post:post})
            })
        })
        
    } else {
        if (post.likedBy && post.likedBy.includes(req.body.userId)) post.likedBy.remove(req.body.userId)
        Post.findByIdAndUpdate(post._id, post, {}).populate('author').exec((err, post)=>{
            if (err) return next(err)
            res.json({post:post})
        })
    }

}

exports.deletePost = (req, res, next) =>{
    Post.findByIdAndDelete(req.body.postId).exec(async(err, post)=>{
        if (err) return next(err)
        Comment.deleteMany({post:req.body.postId}).exec((err, comment)=>{
            if (err) return next(err)
        })
        const user = await User.findById(post.author)
        user.posts.remove(req.body.postId)
        
        User.findByIdAndUpdate(user._id, user, {}, (err, user)=>{
            if (err) return next(err)
            res.json({message:'done'})
        })
    })
    
}