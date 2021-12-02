import { Request, Response, NextFunction } from 'express';

import { pictureCheck } from '../../../service/pictureCheck';
import dbManager from '../../../service/dbManager';
import { DBUser, IProfile } from '../../../types';

const profile = {
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdx = Number(req.params.useridx);
      const userUpdateData: IProfile = req.body;
      const pList: (string | null)[] = [userUpdateData.cover, null, null];
      if (!(await pictureCheck(pList))) res.json({ check: false });
      else {
        await dbManager.updateProfile(userUpdateData, userIdx);
        res.json({ check: true });
      }
    } catch (err) {
      console.error(err);
      res.json({ check: false });
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.params.username;
    const userdata: DBUser = await dbManager.getProfile(name);
    if (userdata === undefined) res.json({ data: '', error: true });
    else res.json({ data: userdata, error: false });
  }
};

export default profile;
