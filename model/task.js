const axios = require('axios')

class Task {

    constructor(id, title, updated, notes, status, due) {
        this.id = id
        this.title = title
        this.updated = updated
        this.notes = notes
        this.status = status
        this.due = due
    }


    static async getAllTasks(accessToken, taskListID) {
        try {
            const response = await axios.get(`https://tasks.googleapis.com/tasks/v1/lists/${taskListID}/tasks`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })

            const { data } = response
            console.log(data)
            //     console.log(response)
            // console.log(response.items)
            // console.log(response.items[0])
        } catch (err) {
            console.log(err)
        }
    }
}


module.exports = Task
