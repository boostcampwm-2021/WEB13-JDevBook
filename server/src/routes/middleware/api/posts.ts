import { Request, Response, NextFunction } from 'express';

import dbManager from '../../../service/dbManager';
import { pictureCheck } from '../../../service/pictureCheck';
import { PostAddData, PostUpdateData } from '../../../types';

const posts = {
  get: async (
    req: Request<
      {},
      {},
      {},
      { lastIdx: number; count: number; username: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const myIdx = req.session.useridx;
      const { lastIdx, count, username } = req.query;
      const userIdx = username ? await dbManager.getUseridx(username) : null;
      const posts = await dbManager.getPosts(
        myIdx,
        Number(lastIdx),
        Number(count),
        userIdx
      );
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  add: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PostAddData: PostAddData = req.body;
      const pList: (string | null)[] = [
        PostAddData.picture1,
        PostAddData.picture2,
        PostAddData.picture3
      ];
      if (!(await pictureCheck(pList))) res.json({ result: {}, check: false });
      else {
        const postData = await dbManager.addPost(PostAddData);
        res.json({ result: postData, check: true });
      }
    } catch (err) {
      console.error(err);
      res.json({ result: {}, check: false });
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postIdx = Number(req.params.postidx);
      const postUpdateData: PostUpdateData = req.body;
      const pList: (string | null)[] = [
        postUpdateData.picture1,
        postUpdateData.picture2,
        postUpdateData.picture3
      ];
      if (!(await pictureCheck(pList))) res.json({ check: false });
      else {
        await dbManager.updatePost(postUpdateData, postIdx);
        res.json({ check: true });
      }
    } catch (err) {
      console.error(err);
      res.json({ check: false });
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postIdx = Number(req.params.postidx);
      await dbManager.deletePost(postIdx);
      res.json(true);
    } catch (err) {
      console.error(err);
      res.json(false);
    }
  }
};

export default posts;
