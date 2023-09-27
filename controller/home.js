const Task = require('../model/task')
const { getUserInfo } = require('../service/user')
const { getAllTaskLists } = require('../service/task_list')
const { getAllTasks, getTask, deleteTask, addTask } = require('../service/task')

const homeRoute = async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
        return res.status(500).render('error')
    }
}

//will display all the tasks of a list
const getAllTasksRoute = async (req, res) => {
    try {
        if (!req.params.taskListID) return res.status(404).render('error')

        const accessToken = req.user

        const user = req.session.userInfo
        const tasklists = req.session.taskLists

        req.session.selectedListID = req.params.taskListID //save the current selected list

        const allTasks = await getAllTasks(accessToken, req.params.taskListID)
        req.session.tasks = allTasks

        res.render('home', {
            taskLists: tasklists,
            tasks: allTasks,
            user,
            selectedListID: req.params.taskListID
        })
    } catch (e) {
        console.log(e)
        return res.status(500).render('error')
    }
}

const getTaskRoute = async (req, res) => {
    try {
        if (!req.params.taskListID || !req.params.taskID) return res.status(404).render('error')

        const accessToken = req.user

        const task = await getTask(accessToken, req.params.taskListID, req.params.taskID)

        console.log(task)

        res.render('task', {
            task,
            selectedListID: req.session.selectedListID
        })
    } catch (e) {
        console.log(e)
        return res.status(500).render('error')
    }
}

const addTaskRoute = async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
        return res.status(500).render('error')
    }

}

const deleteTaskRoute = async (req, res) => {
    try {
        if (!req.params.taskListID || !req.params.taskID) return res.status(404).render('error')

        const accessToken = req.user

        const task = await deleteTask(accessToken, req.params.taskListID, req.params.taskID)

        if (!task) {
            console.log('task deleted sucessfully')
            const selectedListID = req.session.selectedListID

            res.redirect(`/taskLists/${selectedListID}/tasks`)

        }
    } catch (e) {
        console.log(e)
        return res.status(500).render('error')
    }
}

module.exports = { homeRoute, getAllTasksRoute, getTaskRoute, addTaskRoute, deleteTaskRoute }