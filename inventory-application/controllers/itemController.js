const Item = require("../models/item");
const Category = require('../models/category');
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

exports.item_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
};

exports.item_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create POST");
};

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