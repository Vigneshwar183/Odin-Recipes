const async = require('async')
const Category = require('../models/category')
const Item = require('../models/item')
const {body, validationResult } = require('express-validator')


exports.category_list= (req,res,next)=>{
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

exports.category_create_get= (req,res,next)=>{
  res.render('category_form',{title: 'Create category'})
}

exports.category_create_post = [
  body('name', 'Genre Name').trim().isLength({min:1}).escape(),
  (req,res,next)=>{
    const errors = validationResult(req)
    const category = new Category({ name: req.body.name})
    if(!errors.isEmpty()){
      res.render('category_form',{ title: 'Create category',category: category, errors: errors.array()})
      return
    }
    else{
      Category.findOne({name: req.body.name})
      .exec((err,found_category)=>{
        if (err) {
          return next(err)
        }
        if (found_category){
          res.redirect(found_category.url)
        }
        else{
          category.save(function(err){
            if (err){
              return next(err)
            }
            res.redirect(category.url)
          })
        }
      })
    }
  }
]

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