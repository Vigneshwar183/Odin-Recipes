const mongoose = require('mongoose')

const Schema = mongoose.Schema

var postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    },
    post : {
        type:String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'commentModel'
    }],
    published : Boolean,
    createdAt : Date,
    publishedAt : Date
})

postSchema.virtual('url').get(function(){
    return `/post/${this._id}`
})

var postModel = mongoose.model('postModel', postSchema)

module.exports = postModel