import { Request, Response, NextFunction } from 'express';

import dbManager from '../../../service/dbManager';
import { CommentData } from '../../../types';

const comments = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postidx = Number(req.params.postidx);
      const result = await dbManager.getComments(postidx);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.json(false);
    }
  },
  add: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addComment: CommentData = req.body;
      const result = await dbManager.addComment(addComment);
      res.json({ result: result, check: true });
    } catch (err) {
      console.error(err);
      res.json({ check: false });
    }
  }
};

export default comments;
