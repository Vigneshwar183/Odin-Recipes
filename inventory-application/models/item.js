const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ItemSchema= new Schema({
    name: String,
    description: String,
    category: {type: Schema.Types.ObjectId, ref: 'categoryModel'},
    price: Number,
    number_in_stock: Number
})

ItemSchema.virtual('url').get(function(){
    return `/catalog/item/${this.__id}`
})

const itemModel = mongoose.model('itemModel',ItemSchema)

module.exports = itemModel