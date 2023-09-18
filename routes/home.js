const express = require('express')
const User = require('../model/user')

const TaskList = require('../model/task_list')
const Task = require('../model/task')

const router = express.Router()

router.get('/', async (req, res) => {
    if (!req.user) return res.render('splash')

    const accessToken = req.user
    const user = await User.getUserInfo(accessToken);
    const tasklists = await TaskList.getAllTaskLists(accessToken);

    const allTasksOfMyList = await Task.getAllTasks(accessToken, 'MTM1NzEzNjczOTE1NjY0NjcwOTg6MDow')



    console.log('user is ', req.user)
    const dummyData = [
        { id: 'task1', title: 'Task 1', completed: true },
        { id: 'task2', title: 'Task 2', completed: false },
        // Add more dummy tasks as needed
    ];


    res.render('home', {
        tasks: dummyData,
        activeCount: 1,
        user
    })
})


module.exports = router