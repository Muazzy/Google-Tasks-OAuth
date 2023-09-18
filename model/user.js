const axios = require('axios')

class User {
    constructor(name, email, picture) {
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    static async getUserInfo(accessToken) {
        try {
            // Make an API request to get user info
            const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            // Extract user info from the response
            const { name, email, picture } = response.data;

            // Create a UserModel instance and return it
            return new User(name, email, picture);
        } catch (error) {
            console.log(error)
            throw new Error('Failed to fetch user info');
        }
    }
}

module.exports = User