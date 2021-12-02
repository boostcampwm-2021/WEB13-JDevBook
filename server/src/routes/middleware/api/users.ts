import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { DBUser } from '../../../types';
import dbManager from '../../../service/dbManager';
const oauth = require('../../../config/oauth.json');

const users = {
  search: async (
    req: Request<{}, {}, {}, { keyword: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { keyword } = req.query;
      const searchedUsers = keyword ? await dbManager.searchUsers(keyword) : [];
      res.json(searchedUsers);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await dbManager.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  data: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = jwt.verify(req.session.jwt, oauth.jwtKey) as {
        name: string;
      };
      if (name === req.session.username) {
        const userdata: DBUser = await dbManager.getUserData(name);
        res.json({
          data: userdata,
          error: false
        });
      } else {
        console.log(`로그인 정보 비정상 감지: ${req.session.username}`);
        req.session.destroy((err) => {
          res.json({ data: '', error: true });
        });
      }
    } catch (err) {
      req.session.destroy((err) => {
        res.json({ data: '', error: true });
      });
    }
  }
};

export default users;
