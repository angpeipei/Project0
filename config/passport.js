const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const passwordUtils = require('../lib/passwordUtils')

const customFields = {usernameField:'email', passwordField:'password'}
const verifyCallback = (email, password, done) => {
    userModel.findOne({email:email})
        .then((user) => {
            if (!user) { return done(null, false)}
            passwordUtils.validatePassword(password, user.password)
                .then((isMatch) => {
                    console.log(`${email} verified ${isMatch}`)
                    if (isMatch) {return done(null, user)}
                    return done(null, false)
                })            
        })
        .catch((err) => {
            done(err)
        })
}

const strategy = new localStrategy(customFields, verifyCallback)
passport.use(strategy)


passport.serializeUser((user,done)=>done(null, user.id))
passport.deserializeUser((userid,done)=>{
    userModel.findById(userid)
    .then((user) => {
        done(null, user)
    })
    .catch(err => done(err))
})