const express = require('express')
const { getUserInfo } = require('../service/user')
const { getAllTaskLists } = require('../service/task_list')
const { getAllTasks, getTask, deleteTask, addTask } = require('../service/task')

const ISODateString = require('../utils/utils')
const Task = require('../model/task')
const router = express.Router()

//main home route for controlling other cases
router.get('/', async (req, res) => {
    if (!req.user) return res.render('splash')

    const accessToken = req.user

    const user = await getUserInfo(accessToken);
    req.session.userInfo = user

    const tasklists = await getAllTaskLists(accessToken);
    if (!tasklists || tasklists.length === 0) return res.render('home', {
        user
    })

    req.session.taskLists = tasklists

    res.redirect(`/taskLists/${tasklists[0].id}/tasks`)
})

//get all tasks of a taskList
router.get('/taskLists/:taskListID/tasks', async (req, res) => {
    if (!req.params.taskListID) return res.status(404).render('error')

    const accessToken = req.user

    const user = req.session.userInfo
    const tasklists = req.session.taskLists

    req.session.selectedListID = req.params.taskListID //save the current selected list

    const allTasks = await getAllTasks(accessToken, req.params.taskListID)
    req.session.tasks = allTasks

    // const accessToken = req.user

    // const user = req.session.userInfo
    // const tasklists = req.session.taskLists
    res.render('home', {
        taskLists: tasklists,
        tasks: allTasks,
        user,
        selectedListID: req.params.taskListID
    })
})

//add a new task in a taskList
router.post('/taskLists/:taskListID/tasks', async (req, res) => {
    if (!req.params.taskListID || !req.body) return res.status(404).render('error')

    const accessToken = req.user

    const due = new Date(req.body.due).toISOString()

    const reqBody = {
        title: req.body.title,
        due
    }

    console.log(reqBody)

    const task = await addTask(accessToken, req.params.taskListID, reqBody)

    console.log('new task might be: ', task)

    if (task instanceof Task) {
        console.log('new task added:', task)

        res.redirect(`/taskLists/${req.params.taskListID}/tasks`)

    }
})


//get a task with taskID
router.get('/taskLists/:taskListID/tasks/:taskID', async (req, res) => {
    if (!req.params.taskListID || !req.params.taskID) return res.status(404).render('error')

    const accessToken = req.user

    const task = await getTask(accessToken, req.params.taskListID, req.params.taskID)

    console.log(task)

    res.render('task', {
        task,
        selectedListID: req.session.selectedListID
    })
})


//delete a task with taskID
router.delete('/taskLists/:taskListID/tasks/:taskID', async (req, res) => {
    if (!req.params.taskListID || !req.params.taskID) return res.status(404).render('error')

    const accessToken = req.user

    const task = await deleteTask(accessToken, req.params.taskListID, req.params.taskID)

    if (!task) {
        console.log('task deleted sucessfully')
        const selectedListID = req.session.selectedListID

        res.redirect(`/taskLists/${selectedListID}/tasks`)

    }
})



module.exports = router