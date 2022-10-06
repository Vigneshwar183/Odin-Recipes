const Item = require("../models/item");
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const async = require('async');
const { Model } = require("mongoose");

exports.index = (req, res) => {
  async.parallel(
    {
        category_count(callback){
            Category.countDocuments({}, callback)
        },
        item_count(callback){
            Item.countDocuments({},callback)
        }
    },
    (err, results)=>{
        console.log(err,results)
        res.render('index',{
            title: "Inventory Home",
            error: err,
            data: results,
        });
    });
};

exports.item_list = (req, res) => {
    Item.find({},"name price")
    .sort({name:1})
    .populate('category')
    .exec(function(err,list_items){
        if (err){
            return next(err)
        }
        res.render("item_list",{title:"Item list", item_list: list_items})
    })
};

exports.item_detail = (req, res, next) => {
    Item.findById(req.params.id).exec(function(err,item){
        if(err){
            return next(err)
        }
        res.render("item_detail",{title:'Item Detail', item:item})
    })
};

exports.item_create_get = (req, res, next) => {
  Category.find().exec(function(err, result){
    if (err){
      return next(err)
    }
    res.render('item_form', { title: 'Create Item', categories: result})
  })
};

exports.item_create_post = [
  (req, res, next) => {
  if(!(req.body.category instanceof Array)){
    if (typeof req.body.category === undefined) req.body.category=[]
    else req.body.category = new Array(req.body.category);
  }
  next()
  },
  body('name', 'Name must not be empty.')
    .trim()
    .isLength({min:1})
    .escape(),
  body('description', 'description must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('category.*').escape(),
  (req, res, next)=>{
    const errors = validationResult(req);
    console.log(req.body)
    const item = new Item({
      name : req.body.name,
      description : req.body.description,
      category : req.body.category,
      price : req.body.price,
      number_in_stock : req.body.number_in_stock
    });
    if (!errors.isEmpty()){
      Category.find().exec(function(err,result){
        if (err){
          return next(err)
        }
        res.render('item_form',{
          title: 'Create item',
          categories: result,
          item: item,
          error:errors.array()
        })
      })
      return;
    }
    item.save((err)=>{
      if(err){
        return next(err)
      }
      res.redirect(item.url)
    })
  }
]

exports.item_delete_get = (req, res, next) => {
  Item.findById(req.params.id)
    .populate('category')
    .exec((err,item)=>{
      if (err){
        return next(err)
      }
      if (item==null){
        res.redirect('/items')  
      }
      res.render('item_delete',{ title: 'Delete Item', item:item})
    })
};

exports.item_delete_post = (req, res, next) =>{
  const trimmedId= req.body.id.trim()
  Item.findByIdAndRemove(trimmedId,function deleteItem(err){
    if (err){
      return next(err)
    }
    res.redirect('/catalog/items')
  })
}

exports.item_update_get = (req, res) => {
  async.parallel(
    {
      item(callback){
        Item.findById(req.params.id).populate('category').exec(callback)
      },
      categories(callback){
        Category.find().exec(callback)
      }
    },
    function(err, results){
      if (err){
        return next(err)
      }
      if (results.item==null){
        const err = new Error('No item found')
        err.status=404
        return next(err)
      }
      res.render('item_form',{
        title: 'Update item',
        item: results.item,
        categories: results.categories
      })
    }
  )
};

exports.item_update_post = [
  body('name')
    .trim()
    .isLength({min:3})
    .escape(),
  body('description')
    .trim()
    .escape(),
  (req, res, next)=>{
    const errors = validationResult(req)
    var item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      category: req.body.category,
      _id:req.params.id
    })

    if (!errors.isEmpty){
      Category.find().exec(function(err, results){
        if(err){
          return next(err)
        }
        res.render('item_form',{
          title: 'Update item',
          item: item,
          categories: results,
          errors: errors.array()
        })
      })
    }else{
      Item.findByIdAndUpdate(
        req.params.id,
        item,
        {},
        function(err, theitem){
          if (err){
            return next(err)
          }
          res.redirect(theitem.url)
        }
      )
    }
  }
]