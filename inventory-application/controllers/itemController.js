const Item = require("../models/item");
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const async = require('async');

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
    console.log(result)
    res.render('item_form', { title: 'Create Item', categories: result})
  })
};

exports.item_create_post = [
  (req, res, next) => {
  if (!Array.isArray(req.body.category)){
    req.body.category = typeof req.body.category === 'undefined' ? [] : [req.body.category];
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
    const item = new Item({
      name : req.body.name,
      description : req.body.description,
      category : req.body.category,
      price : 30,
      number_in_stock : 7
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

exports.item_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

exports.item_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

exports.item_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

exports.item_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};