import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const oauth = require('../../../config/oauth.json');

const isLogin = {
  check: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = jwt.verify(req.session.jwt, oauth.jwtKey) as {
        name: string;
      };
      if (name === req.session.username) {
        res.json(true);
      } else {
        req.session.destroy((err) => {
          res.json(false);
        });
      }
    } catch (err) {
      req.session.destroy((err) => {
        res.json(false);
      });
    }
  }
};

export default isLogin;
