const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('./models/User');
require('dotenv').config();

passport.serializeUser((user, done)=>{
    return done(null, user)
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user)
    })
})

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_API_ID,
    clientSecret: process.env.FACEBOOK_API_SECRET,
    callbackURL: 'http://localhost:3000/auth/login/facebook'
  },
  async function(accessToken, refreshToken, profile, cb) {    
    const userExists = await User.findOne({facebookId: profile.id})

    if (userExists){
        const user= userExists
        return cb(null, user)
    } else {
        var user = new User({
            username: profile.displayName,
            facebookId: profile.id
        })
        user.save((err)=>{
            if (err) return next(err)
        })
        return cb(null, user)

    }

    // User.find({facebookId:profile.id}).exec((err, user)=>{
    //     if (err) return next(err)
    //     var user = new User({
    //         username: profile.displayName,
    //         facebookId: profile.id
    //     })
    //     user.save((err)=>{
    //         if (err) return next(err)
    //     })
    //     cb(null, user)
    // })


    // db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    //   'https://www.facebook.com',
    //   profile.id
    // ], function(err, cred) {
    //   if (err) { return cb(err); }
    //   if (!cred) {
    //     // The Facebook account has not logged in to this app before.  Create a
    //     // new user record and link it to the Facebook account.
    //     db.run('INSERT INTO users (name) VALUES (?)', [
    //       profile.displayName
    //     ], function(err) {
    //       if (err) { return cb(err); }

    //       var id = this.lastID;
    //       db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
    //         id,
    //         'https://www.facebook.com',
    //         profile.id
    //       ], function(err) {
    //         if (err) { return cb(err); }
    //         var user = {
    //           id: id.toString(),
    //           name: profile.displayName
    //         };
    //         return cb(null, user);
    //       });
    //     });
    //   } else {
    //     // The Facebook account has previously logged in to the app.  Get the
    //     // user record linked to the Facebook account and log the user in.
    //     db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
    //       if (err) { return cb(err); }
    //       if (!user) { return cb(null, false); }
    //       return cb(null, user);
    //     });
    //   }
    // });
  }
));

module.export = passport