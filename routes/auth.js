const express = require('express')
const passport = require('passport')
const { loginView, logout, GoogleAuthStrategy, authenticate } = require('../controller/auth')

const router = express.Router()


router.get('/login', loginView)

passport.use(GoogleAuthStrategy)


// and we will be redirected back here after we try to login/signin or whatever
router.get(process.env.REDIRECT_URI, passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}))


router.post('/logout', logout)


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


module.exports = router