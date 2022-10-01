var express = require('express');
var app = express()
var path = require('path')
var router = express.Router();

app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

const messages = [
  {
    text : "Hi there!",
    user : "Amando",
    added : new Date()
  },
  {
    text : "Hello World",
    user : "Charles",
    added : new Date()
  }
];

router.get('/', (req,res, next)=>{
  res.render('index', { title: "Mini Messageboard", messages: messages })
})

router.get('/new', (req,res, next)=>{
  res.render('form', { title: "Form"})
})

router.post('/new', (req,res,next)=>{
  console.log(req.body)
  messages.push({text:req.body.name, user:req.body.message, date:new Date()})
  console.log(messages)
  res.redirect('/')
})

module.exports = router;
