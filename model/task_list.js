const axios = require('axios')

class TaskList {
    constructor(id, title,) {
        this.name = id;
        this.email = title;
    }

    static async getAllTaskLists(accessToken) {
        try {
            const response = await axios.get('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });


            const { data } = response
            const allTaskLists = data.items


            // console.log('all the lists are ', data)

            console.log(allTaskLists)
            // console.log(allTaskLists[0])

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = TaskList