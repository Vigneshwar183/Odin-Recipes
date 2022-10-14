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
    post : String,
    comments: [{
        commentAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'userModel',
            required: true
        },
        commentDate: Date,
        comment: {
            type: String,
            required: true
        }
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