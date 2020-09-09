const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('passport')
    
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username', passwordField: 'password'}, (username, password, done) => {
            //Match user 
            User.findOne({
                where: {
                    name: username
                }
            })
            .then(user => {
                //console.log(user)
                if(!user) {
                    return done(null, false, { message: 'Bruger eksisterer ikke'})
                }
            
            //Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err

                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Forkert password'})
                    }
                })
            }).catch(err => console.error(err))
        })
    )
    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}




