import type { Request, Response } from 'express';
import { checkPassword, hashPassword } from '../utils/auth';
import { generateToken } from '../utils/jwt';
import slug from 'slug';
import User from '../models/User';
import formidable from 'formidable';
import cloudinary from '../config/cloudinary';

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

  const token = generateToken({ id: user._id });
  res.send(token);
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { description, links } = req.body;
    const handle = slug(req.body.handle, '');
    const handleExist = await User.findOne({ handle });
    if (handleExist && handleExist.email !== req.user.email) {
      const error = new Error('Handle already exist');
      return res.status(409).json({ error: error.message });
    }
    req.user.description = description;
    req.user.handle = handle;
    req.user.links = links;
    await req.user.save();
    res.send('Profile updated');
  } catch (err) {
    const error = new Error('Server error');
    return res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req: Request, res: Response): Promise<any> => {
  const form = formidable({ multiples: false });

  try {
    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(files.file[0].filepath, {}, async function (error, result) {
        if (error) {
          const error = new Error('Hubo un error al subir la imagen');
          return res.status(500).json({ error: error.message });
        }
        if (result) {
          req.user.image = result.secure_url;
          await req.user.save();
          res.json({ image: result.secure_url });
        }
      });
    });
  } catch (err) {
    const error = new Error('Server error');
    return res.status(500).json({ error: error.message });
  }
};
