const Task = require('../model/task')
const axios = require('axios')


async function getAllTasks(accessToken, taskListID) {
    try {
        const response = await axios.get(`https://tasks.googleapis.com/tasks/v1/lists/${taskListID}/tasks`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            params: {
                'showCompleted': false,
                // 'showDeleted': true,
                'showHidden': true
            }
        })
        const { data } = response
        const items = data.items

        let tasks = []

        items.forEach(task => {
            tasks.push(new Task(task.id, task.title, task.updated, task.notes, task.status, task.due))
        });

        return tasks
    } catch (err) {
        console.log(err.message)
    }
}


async function getTask(accessToken, taskListID, taskID) {
    try {
        const response = await axios.get(`https://tasks.googleapis.com/tasks/v1/lists/${taskListID}/tasks/${taskID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        const { data } = response

        return new Task(data.id, data.title, data.updated, data.notes, data.status, data.due);
    } catch (err) {
        console.log(err.message)
    }
}


async function deleteTask(accessToken, taskListID, taskID) {
    try {
        const response = await axios.delete(`https://tasks.googleapis.com/tasks/v1/lists/${taskListID}/tasks/${taskID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        const { data } = response

        return data === undefined
    } catch (err) {
        console.log(err.message)
    }
}


async function addTask(accessToken, taskListID, body) {
    try {
        if (!body || !body.title) return
        const response = await axios.post(`https://tasks.googleapis.com/tasks/v1/lists/${taskListID}/tasks`, {
            title: body.title,
            due: body.due ?? '',
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        const { data } = response

        return new Task(data.id, data.title, data.updated, data.notes, data.status, data.due);
    } catch (err) {
        console.log(err.message)
    }
}




module.exports = { getAllTasks, getTask, deleteTask, addTask }
