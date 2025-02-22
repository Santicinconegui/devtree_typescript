import { Router } from 'express';
import { body } from 'express-validator';
import { register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', body('handle').notEmpty(), register);

export default router;
