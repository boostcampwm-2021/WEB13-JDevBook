import * as express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: any, res, next) => {
  res.end('1234');
});

module.exports = router;
