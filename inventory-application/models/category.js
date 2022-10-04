const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:String
})

CategorySchema.virtual('url').get(function(){
    return `/catalog/category/${this.__id}`
})

const categoryModel = mongoose.model('categoryModel',CategorySchema)

module.exports = categoryModel
