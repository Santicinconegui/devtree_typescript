import { Router } from 'express';
import { body } from 'express-validator';
import { getUser, login, register, updateProfile, uploadImage } from '../controllers/auth.controller';
import { handleInputErrors } from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post(
  '/register',
  handleInputErrors,
  body('handle').notEmpty().withMessage('The handle cannot be sent empty'),
  body('name').notEmpty().withMessage('The name cannot be sent empty'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 8 }).withMessage('The password must be at least 8 characters long'),
  register
);

router.post(
  '/login',
  handleInputErrors,
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 8 }).withMessage('The password is required'),
  login
);

router.get('/user', authenticate, getUser);

router.patch(
  '/user',
  body('handle').notEmpty().withMessage('The handle cannot be sent empty'),
  handleInputErrors,
  authenticate,
  updateProfile
);

router.post('/user/image', authenticate, uploadImage);
export default router;
