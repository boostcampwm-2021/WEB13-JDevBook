import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../config/.env.development') });
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dbManager from '../service/dbManager';
import { DBUser } from '../service/interface';
const githubOauth = require('../service/githubOauth');
const oauth = require('../config/oauth.json');

const router = express.Router();

const clientURL: string = process.env.LOCAL_CLIENT ?? '/';

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  res.json(githubOauth.authorizeURL);
});

router.get(
  '/callback',
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.code) res.redirect(clientURL);

    const accessToken: string = await githubOauth.getAccessToken(
      req.query.code
    );
    const username: string = await githubOauth.getUsername(accessToken);

    const userdata: DBUser = await dbManager.getUserdata(username);
    console.log(userdata);

    req.session.username = userdata.nickname;
    req.session.useridx = userdata.idx; // 자신 idx
    req.session.jwt = jwt.sign(
      {
        name: username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24시간
      },
      oauth.jwtKey
    );

    req.session.save((err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).send('<h1>500 error</h1>');
      }
      res.redirect(clientURL + 'home');
    });
  }
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  const username = req.session.username;
  req.session.destroy((err: any) => {
    if (err) console.error(err);
    //console.log(`로그아웃 정상 작동: ${username}`);
    //res.redirect(clientURL);
    res.status(200).json({ message: `${username} Logged Out` });
  });
});

module.exports = router;
