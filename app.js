const PORT = process.env.PORT || 3000

require('dotenv').config()
const express = require('express')
var path = require('path');


const app = express()

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))



// app.get('/', (req, res) => {
//     res.render("index")
// })

app.get('/', (req, res) => {
    res.render("login")
})

app.get('/home', (req, res) => {
    const dummyData = [
        { id: 'task1', title: 'Task 1', completed: true },
        { id: 'task2', title: 'Task 2', completed: false },
        // Add more dummy tasks as needed
    ];
    res.render("home", {
        tasks: dummyData,
        activeCount: 1,
    })
})

app.listen(PORT, () => { console.log(`litsening on port:${PORT}`) })