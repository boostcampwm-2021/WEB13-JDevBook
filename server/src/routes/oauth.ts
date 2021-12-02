import express from 'express';

import { githubLogin, logout } from './middleware/oauth';

const router = express.Router();

router.get('/login', githubLogin.authorize);
router.get('/callback', githubLogin.callback);
router.get('/logout', logout);

module.exports = router;
