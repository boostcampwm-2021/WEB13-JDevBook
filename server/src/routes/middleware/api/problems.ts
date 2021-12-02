import { Request, Response, NextFunction } from 'express';
import dbManager from '../../../service/dbManager';

const problems = {
  oneGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupIdx = Number(req.params.groupidx);
      const problems = groupIdx ? await dbManager.getProblems([groupIdx]) : [];
      res.json(problems);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  myGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await dbManager.getUserJoinedGroups(req.session.useridx);
      const groupIndices = JSON.parse(JSON.stringify(groups)).map(
        (item: any) => item.groupidx
      );
      const problems = await dbManager.getProblems(groupIndices);
      res.json(problems);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  useridxGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdx = Number(req.params.useridx);
      const groups = await dbManager.getUserJoinedGroups(userIdx);
      const groupIndices = JSON.parse(JSON.stringify(groups)).map(
        (item: any) => item.groupidx
      );
      const problems = await dbManager.getProblems(groupIndices);
      res.json(problems);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  addCorrect: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdx = req.session.useridx;
      const { problemIdx } = req.body;
      await dbManager.insertSolvedProblem(userIdx, Number(problemIdx));
      res.json(true);
    } catch (err) {
      res.json(false);
    }
  },
  getCorrect: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName = req.params.username;
      const result = await dbManager.getSolvedProblems(userName);
      res.json(result);
    } catch (err) {
      res.json(false);
    }
  }
};

export default problems;
