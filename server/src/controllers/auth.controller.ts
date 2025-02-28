import type { Request, Response } from 'express';
import { checkPassword, hashPassword } from '../utils/auth';
import slug from 'slug';
import User from '../models/User';
import { handleInputErrors } from '../middleware/validation';

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'Email in use' });
    }

    const handle = slug(req.body.handle, '');
    const handleExist = await User.findOne({ handle });
    if (handleExist) {
      return res.status(400).json({ message: 'Handle already exist' });
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found');
    return res.status(409).json({ error: error.message });
  }

  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error('Invalid password');
    return res.status(401).json({ error: error.message });
  }
  res.send('Autenticathed');
};
