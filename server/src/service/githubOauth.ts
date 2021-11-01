const oauth = require('../config/oauth.json');
const github = oauth.githubLocal;

const githubOauth = {
    authorizeURL: `https://github.com/login/oauth/authorize?client_id=${github.CLIENT_ID}&redirect_uri=${github.CALLBACK_URL}`
}

module.exports = githubOauth;