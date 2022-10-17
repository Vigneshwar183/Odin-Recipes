const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.virtual('url').get(function(){
    return `/user/${this._id}`
})

var userModel = mongoose.model('userModel', userSchema)

module.exports = userModel