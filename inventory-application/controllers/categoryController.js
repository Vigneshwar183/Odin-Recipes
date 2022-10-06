const async = require('async')
const Category = require('../models/category')
const Item = require('../models/item')
const {body, validationResult } = require('express-validator')
const { Model } = require('mongoose')
const { item_list } = require('./itemController')


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

exports.category_delete_get = (req, res, next) => {
    async.parallel(
      {
        category(callback){
          Category.findById(req.params.id).exec(callback);
        },
          category_items(callback){
            Item.find({category: req.params.id}).exec(callback);
        },
      },
      function(err,results){
        if(err){
          return next(err)
        }
        if (results.category == null){
          res.redirect('/catalog/category/')
        }
        res.render('category_delete',{
          title: 'Category Delete',
          category: results.category,
          category_items: results.category_items
        })
      }
    )
  };
  
exports.category_delete_post = [
  body('Category').trim(),
  body('_id').trim(),
  (req, res, next) => {
    async.parallel(
      {
        category(callback){
          Category.findById(req.body.id).exec(callback)
        },
        category_items(callback){
          Item.find({category:req.body.id}).exec(callback)
        }
      },
      function(err,results){
        if (err){
          return next(err)
        }
        if (results.category_items.length>0){
          res.render('category_delete',{
            title: 'Delete Category',
            category: results.category,
            category_items: results.category_items
          })
          return
        }else{
          const trimmedCategoryId= req.body.categoryid.trim()
          Category.findByIdAndDelete(trimmedCategoryId,function deleteCategory(err){
            if(err){
              return next(err)
            }
            res.redirect('/catalog/category')
          })
        }
      }
    )
  }
]
  
exports.category_update_get = (req, res) => {
  Category.findById(req.params.id).exec(function(err,category){
    if (err){
      return next(err)
    }
    if (category== null){
      const err= new Error('Category not found')
      err.status=404
      return next(err)
    }
    res.render('category_form',{
      title: "Update Category",
      category: category
    })
  })
};
  
exports.category_update_post = [
  body('name', 'Category name')
    .trim()
    .isLength({min:3})
    .escape(),
  (req, res, next)=>{
    const errors = validationResult(req)
    var category = new Category({
      name: req.body.name,
      _id:req.params.id
    })
    if (!errors.isEmpty()){
      res.render('category_form',{
        title: 'Update Category',
        category: category,
        errors: errors.array()
      })
      return
    } else{
      Category.findByIdAndUpdate(
        req.params.id,
        category,
        {},
        function(err,thecategory){
          if(err){
            return next(err)
          }
          res.redirect(thecategory.url)
        }
      )
    }
  }
]