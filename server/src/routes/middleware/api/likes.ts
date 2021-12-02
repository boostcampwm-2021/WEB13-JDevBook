import { Request, Response, NextFunction } from 'express';
import dbManager from '../../../service/dbManager';

const likes = {
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postIdx = Number(req.params.postidx);
      const { likeNum } = req.body;
      await dbManager.updateLikeNum(postIdx, likeNum);
      res.json(true);
    } catch (err) {
      console.error(err);
      res.json(false);
    }
  },
  toggle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useridx = Number(req.params.useridx);
      const postidx = Number(req.params.postidx);
      const result = await dbManager.toggleLikePosts(useridx, postidx);
      res.json(result);
    } catch (err) {
      res.json(false);
    }
  }
};

export default likes;
