const PORT = process.env.PORT || 3000

require('dotenv').config()
const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

//for delete and put request with forms
const methodOverride = require('method-override')

//routes
const home = require('./routes/home')
const auth = require('./routes/auth')

const app = express()



app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// app.use(passport.initialize());
// app.use(passport.session());

app.use(passport.authenticate('session'))

app.use(methodOverride('_method'))

app.use('/', home)
app.use('/', auth)



app.listen(PORT, () => { console.log(`litsening on port:${PORT}`) })