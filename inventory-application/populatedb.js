var userArgs = process.argv.slice(2)

if(!userArgs[0].startsWith('mongodb')){
    console.log('Error: You need to specify a vaild mongodb URL as the first argument');
    return
}

var async = require('async')
var Item= require('./models/item')
var Category= require('./models/category')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useUnifiedTopology: true});
//mongoose.Promise = global.promise

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

var items=[]
var categories=[]

function itemCreate(name, description, category, price, number_in_stock, cb){
    itemDetail = {
        name: name,
        description: description,
        price: price,
        number_in_stock: number_in_stock
    }
    if (category!=false) itemDetail.category=category

    var item= new Item(itemDetail);
    item.save(function(err){
        if(err){
            cb(err,null)
            return
        }
        console.log('New Item:'+ item)
        items.push(item)
        cb(null,item)
    })
}

function categoryCreate(name, cb){
    var category = new Category({name:name});

    category.save(function(err){
        if (err){
            cb(err,null);
            return
        }
        console.log('New Category:'+ category)
        categories.push(category)
        cb(null,category)
    });
}

function createCategory(cb){
    async.series([
        function(callback){
            categoryCreate('Games',callback);
        },
        function(callback){
            categoryCreate('Books',callback);
        }
    ],
    cb)
}

function createItems(cb){
    async.parallel([
        function(callback){
            itemCreate('R6S', 'FPS', categories[0], 20, 5, callback);
        },
        function(callback){
            itemCreate('Valorant', 'FPS', categories[0], 30, 2, callback);
        },
        function(callback){
            itemCreate('Apex', 'FPS', categories[0], 10, 10, callback);
        },
        function(callback){
            itemCreate('Harry Potter', 'Fiction', categories[1], 50, 10, callback);
        },
        function(callback){
            itemCreate('Apex and Angels', 'Fantasy', categories[1], 10, 5, callback);
        },
    ])
}

async.series([
    createCategory,
    createItems
    ],
    function(err,results){
        if (err) {
            console.log('Final err:'+ err);
        }
        else{
            console.log('Done')
        }
        mongoose.connection.close();
    }
);
