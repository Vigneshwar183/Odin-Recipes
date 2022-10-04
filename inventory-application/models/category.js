const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = Schema({
    name:String,
    description:String
})

CategorySchema.virtual('url').get(function(){
    return `/catalog/item/${this.__id}`
})

const CategoryModel = mongoose.model('CategoryModel',CategorySchema)

module.exports = CategoryModel
