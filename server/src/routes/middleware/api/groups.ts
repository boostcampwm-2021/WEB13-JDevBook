import { Request, Response, NextFunction } from 'express';
import dbManager from '../../../service/dbManager';

const groups = {
  all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupList = await dbManager.getGroupList();
      res.json(groupList);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupIdx: number = Number(req.params.groupidx);
      const group = await dbManager.getGroup(groupIdx);
      res.json(group);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  joined: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdx: number = Number(req.params.useridx);
      const group = await dbManager.getUserJoinedGroups(userIdx);
      res.json(group);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  userNum: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupIdx: number = Number(req.params.groupidx);
      const userNum = await dbManager.getUserNumInGroup(groupIdx);
      res.json(userNum);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  joinLeave: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useridx = Number(req.params.useridx);
      const postidx = Number(req.params.postidx);
      const result = await dbManager.toggleUserGroup(useridx, postidx);
      res.json(result);
    } catch (err) {
      res.json(false);
    }
  }
};

export default groups;
