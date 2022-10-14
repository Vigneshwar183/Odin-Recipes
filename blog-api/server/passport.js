const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require('dotenv').config();

passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username}).exec((err, user)=>{
        if (err){
            return done(err)
        }else if (!user){
            return done(null, false, {message: 'Incorrect Username'}) 
        }
        return done(null, user)
    })
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtsecret
},function(jwtPayload, done){
    User.findById(jwtPayload._id).exec((err, user)=>{
        if (err){
            return done(err, false)
        }
        if (!user){
            return done(null, false)
        }
        return done(null, user)
    })

}))