import axios from 'axios';
const oauth = require('../config/oauth.json');
const github = process.env.LOCAL_CLIENT ? oauth.githubLocal : oauth.github;

const githubOauth = {
    authorizeURL: `https://github.com/login/oauth/authorize?client_id=${github.CLIENT_ID}&redirect_uri=${github.CALLBACK_URL}`,
    getAccessToken: (authcode: string) => {
        return axios({
            method: 'POST',
            url: `https://github.com/login/oauth/access_token?client_id=${github.CLIENT_ID}&client_secret=${github.CLIENT_SECRET}&code=${authcode}&redirect_uri=${github.CALLBACK_URL}`,
            headers: {
                Accept: 'application/json'
            }
        }).then((res: any) => res.data.access_token)
        .catch(e => console.error(e));
    },
    getUsername: (access_token: string) => {
        return axios({
            method: 'GET',
            url: `https://api.github.com/user`,
            headers: {
                Authorization: `token ${access_token}`
            }
        }).then((res: any) => res.data.login) // 별명(name)이 없는 유저들 존재
        .catch(e => console.error(e));
    }
}

module.exports = githubOauth;