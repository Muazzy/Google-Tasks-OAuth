const express = require('express')
const { homeRoute, getAllTasksRoute, getTaskRoute, addTaskRoute, deleteTaskRoute } = require('../controller/home')
const router = express.Router()

//main home route for controlling other cases, such as unauthorized access etc
router.get('/', homeRoute)

//get all tasks of a taskList
router.get('/taskLists/:taskListID/tasks', getAllTasksRoute)

//add a new task in a taskList
router.post('/taskLists/:taskListID/tasks', addTaskRoute)

//get a task with taskID
router.get('/taskLists/:taskListID/tasks/:taskID', getTaskRoute)


//delete a task with taskID
router.delete('/taskLists/:taskListID/tasks/:taskID', deleteTaskRoute)

module.exports = router