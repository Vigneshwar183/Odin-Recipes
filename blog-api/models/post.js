const mongoose = require('mongoose')
const { module } = require('./user')

const Schema = mongoose.Schema

var postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: userModel
    },
    date: new Date,
    comments: [{
        commentAuthor: {
            type: String,
            required: true
        },
        commentDate: new Date,
        comment: {
            type: String,
            required: true
        }
    }],
    published : Boolean 
})

postSchema.virtual('url').get(function(){
    return `/post/${this._id}`
})

var postModel = mongoose.model('postModel', postSchema)

module.exports = postModel