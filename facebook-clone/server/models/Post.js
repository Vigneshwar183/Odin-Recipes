const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    caption: String,
    author: {
        type: Schema.Types.ObjectId,
        ref:'userModel'
    },
    image:[{
        type:String
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref:'commentModel'
    }],
    post: String,
    createdAt: Date,
    likes: Number,
})

postSchema.virtual('url').get(function(){
    return `/post/${this._id}`
})

var postModel = mongoose.model('postModel', postSchema)

module.exports = postModel