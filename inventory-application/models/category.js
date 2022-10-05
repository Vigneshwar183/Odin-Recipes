const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:String
})

CategorySchema.virtual('url').get(function(){
    return `/catalog/category/${this._id}`
})

const categoryModel = mongoose.model('categoryModel',CategorySchema)

module.exports = categoryModel
