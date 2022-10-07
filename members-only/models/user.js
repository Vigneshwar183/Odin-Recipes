const mongoose= require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        min: 3
    },
    last_name: {
        type: String,
        required: true,
        min:1
    },
    password:{
        type: String,
        required: true
    },
    username: String,
    membershipStatus : Boolean
})

UserSchema.virtual('url').get(function(){
    return `/user/${this._id}`
})

const userModel= mongoose.model('userModel',UserSchema)

module.exports = userModel