const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    facebookId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Date,
        default: ''
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'postModel'
    }],
    friendList: [{
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    }],
    profilePicture:{
        type: String
    },
    coverPhoto: {
        type: String
    }
})

userSchema.virtual('url').get(function(){
    return `/user/${this._id}`
})

const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel