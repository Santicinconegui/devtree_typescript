import { Request, Response } from 'express';
import { hashPassword } from '../utils/auth';
import slug from 'slug';
import User from '../models/User';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response): Promise<any> => {
  let errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
