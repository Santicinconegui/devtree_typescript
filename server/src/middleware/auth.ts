import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const [, token] = bearer.split(' ');
  //   console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof result === 'object' && result.id) {
      const user = await User.findById(result.id).select('-password');
      if (!user) {
        const error = new Error('User not found');
        return res.status(404).json({ error: error.message });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: 'Token is not valid' });
  }
};
