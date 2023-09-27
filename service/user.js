const axios = require('axios')
const User = require('../model/user')

async function getUserInfo(accessToken) {
    try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const { name, email, picture } = response.data;
        return new User(name, email, picture);
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getUserInfo }