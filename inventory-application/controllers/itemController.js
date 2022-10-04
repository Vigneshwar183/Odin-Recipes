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
  res.send("NOT IMPLEMENTED: Book list");
};

exports.item_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
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