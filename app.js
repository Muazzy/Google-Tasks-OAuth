const PORT = process.env.PORT || 3000

require('dotenv').config()
const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')

//routes
const homeRoute = require('./routes/home')
const authRoute = require('./routes/auth')

const app = express()

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views')); //path.join(__dirname, 'xxxx') will get the complete path of the file/dir

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.authenticate('session')) //this is important if you are storing your access token in session

app.use(methodOverride('_method')) //for performing delete/put requests using forms in templates

app.use('/', homeRoute)
app.use('/', authRoute)

app.listen(PORT, () => { console.log(`litsening on port:${PORT}`) })