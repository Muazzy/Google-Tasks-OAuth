const TaskList = require('../model/task_list')
const axios = require('axios')

async function getAllTaskLists(accessToken) {
    try {
        const response = await axios.get('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const { data } = response
        const items = data.items

        let taskLists = []

        items.forEach(taskList => {
            taskLists.push(new TaskList(taskList.id, taskList.title))
        });

        return taskLists
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAllTaskLists }