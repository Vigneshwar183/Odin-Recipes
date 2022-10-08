var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const mongoose = require('mongoose');
require('dotenv').config()
const User = require('./models/user')
const bcrypt = require('bcryptjs')

const mongodb = process.env.mongodb;
mongoose.connect(mongodb,{useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console,'Mongodb connection error'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new localStrategy((username, password, done)=>{
  User.findOne({username: username},(err, user)=>{
    if (err) return done(err)
    if (!user) return done(null, false, {message: 'Incorrect Username'})
    bcrypt.compare(password, user.password, (err,result)=>{
      if (err) return done(err)
      if (result) return done(null, user)
      else return done(null, false, {message:'Incorrect password'})
    })
  })
}))

passport.serializeUser((user, done) =>done(null, user.id))
passport.deserializeUser((id, done)=>User.findById(id,(err, user)=> done(err, user)))

app.use(session({secret:process.env.secret, resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next)=>{
  res.locals.user = req.user
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
