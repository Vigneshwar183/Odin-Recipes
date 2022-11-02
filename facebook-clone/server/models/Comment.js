const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'postModel'
    },
    comment: {
        type: String,
        required: true
    },
    date: Date,
    likes: Number
})

const commentModel = mongoose.model('commentModel', commentSchema)

module.exports = commentModel