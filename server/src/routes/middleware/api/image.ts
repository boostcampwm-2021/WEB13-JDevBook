import { Request, Response, NextFunction } from 'express';
import { upload } from '../../../service/objectStorage';

const image = {
  upload: (req: Request, res: Response, next: NextFunction) => {
    upload.single('imgfile')(req, res, (err) => {
      if (err) return res.json({ file: false, save: false });
      else next();
    });
  },
  send: async (req: Request, res: Response, next: NextFunction) => {
    const s3file = req.file;
    if (s3file) res.json({ file: s3file, save: true });
    else res.json({ file: true, save: false });
  }
};

export default image;
