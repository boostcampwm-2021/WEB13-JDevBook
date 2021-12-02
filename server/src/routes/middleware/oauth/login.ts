import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(__dirname, '../../../config/.env.development')
});

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dbManager from '../../../service/dbManager';
import { DBUser } from '../../../types';
const githubOauth = require('../../../service/githubOauth');
const oauth = require('../../../config/oauth.json');

const clientURL: string = process.env.LOCAL_CLIENT ?? '/';

const githubLogin = {
  authorize: (req: Request, res: Response, next: NextFunction) => {
    res.json(githubOauth.authorizeURL);
  },
  callback: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.code) res.redirect(clientURL);

    const accessToken: string = await githubOauth.getAccessToken(
      req.query.code
    );
    const username: string = await githubOauth.getUsername(accessToken);
    const userdata: DBUser = await dbManager.getUserData(username);

    req.session.username = userdata.nickname;
    req.session.useridx = userdata.idx;
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
};

export default githubLogin;
