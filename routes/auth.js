const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const router = express.Router()


router.get('/login', (req, res) => {
    res.render("login", {
        redirectUri: process.env.REDIRECT_URI
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_APP_ID,
    clientSecret: process.env.CLIENT_APP_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    scope:
        ['email', 'profile', 'https://www.googleapis.com/auth/tasks'],
    passReqToCallback: true,
},
    function (request, accessToken, refreshToken, profile, done) {

        // console.log('access token is', accessToken)
        // console.log('refresh token is', refreshToken)


        process.nextTick(function () {
            return done(null, accessToken, refreshToken, profile);

        })
    }
));


// and we will be redirected back here after we try to login/signin or whatever
router.get(process.env.REDIRECT_URI, passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}))


router.post('/logout', function (req, res, next) {
    //to terminate an existing login session
    req.logout(function (err) {
        if (err) { console.log(err) }
        res.redirect('/')
    })
})


passport.serializeUser(function (user, done) {
    // console.log('serialized user: ', user)
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // console.log('de-serialized user: ', user)

    done(null, user);
});


module.exports = router