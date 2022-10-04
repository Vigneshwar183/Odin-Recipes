const async = require('async')
const Category = require('../models/category')
const Item = require('../models/item')

exports.category_list= (req,res)=>{
  Category.find()
  .sort({name:1})
  .exec(function(err,list_categories){
    if (err){
      return next(err)
    }
    res.render("category_list",{ title:" Category list", category_list:list_categories})
  })
}

exports.category_detail=(req,res, next)=>{
  async.parallel(
    {
      category(callback){
        Category.findById(req.params.id).exec(callback)
      },
      item(callback){
        Item.find({category:req.params.id}).exec(callback)
      }
    },
    (err,results)=>{
      if (err){
        return next(err)
      }
      if (results.category == null){
        const err = new Error('Genre not found')
      }
      console.log(results)
      res.render("category_detail",{title: "Category Detail", category: results.category,category_items: results.item})
    }
  )
}

exports.category_create_get= (req,res)=>{
    res.send('Not implemented')
}

exports.category_create_post = (req,res) =>{
    res.send('Not implemented')
}

exports.category_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Genre delete GET");
  };
  
exports.category_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Genre delete POST");
  };
  
exports.category_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Genre update GET");
  };
  
exports.category_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Genre update POST");
  };