const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const loginView = (req, res) => {
    res.render("login", {
        redirectUri: process.env.REDIRECT_URI
    })
}

const logout = (req, res, next) => {
    req.logout(
        function (err) {
            if (err) { console.log(err) }
            res.redirect('/')
        })
}


const GoogleAuthStrategy = new GoogleStrategy({
    clientID: process.env.CLIENT_APP_ID,
    clientSecret: process.env.CLIENT_APP_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    scope:
        ['email', 'profile', 'https://www.googleapis.com/auth/tasks'],
    passReqToCallback: true,
},
    function (request, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, accessToken, refreshToken, profile);
        })
    }
)

const authenticate = passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
})


module.exports = { loginView, logout, GoogleAuthStrategy, authenticate }