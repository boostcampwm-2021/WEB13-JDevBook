import { Request, Response, NextFunction } from 'express';

const logout = (req: Request, res: Response, next: NextFunction) => {
  const username = req.session.username;
  req.session.destroy((err: any) => {
    if (err) console.error(err);
    res.status(200).json({ message: `${username} Logged Out` });
  });
};

export default logout;
