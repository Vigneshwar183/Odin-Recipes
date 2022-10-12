const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username}).exec((err, result)=>{
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
    secretOrKey: 'secret'
},function(jwtPayload, done){
    User.findOneById(jwtPayload.id).exec((err, user)=>{
        if (err){
            return done(err, false)
        }
        if (!user){
            return done(null, false)
        }
        return done(null, user)
    })

}))