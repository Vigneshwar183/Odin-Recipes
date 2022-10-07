const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'userModel'
    },
    date : Date,
    post : String
},{
    timestamps: true
})

postSchema.virtual('url').get(function(){
    return `/posts/${this._id}`
})

const postModel = mongoose.model('postModel', postSchema)

module.exports = postModel