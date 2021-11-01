import * as express from 'express';
const githubOauth = require('../service/githubOauth');
const router = express.Router();

/* GET home page. */
router.get('/login', (req: any, res, next) => {
  res.json(githubOauth.authorizeURL);
});

router.get('/callback', (req: any, res, next) => {
    
})

module.exports = router;
