const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    facebookId: String
})

userSchema.virtual('url').get(function(){
    return `/user/${this.facebookId}`
})

const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel