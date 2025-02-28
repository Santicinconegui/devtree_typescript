import express from 'express';
import router from './routes/router';
import authRoutes from './routes/auth.routes';
import 'dotenv/config';
import { connectDB } from './config/db';

const app = express();

connectDB();
app.use(express.json());

app.use('/', router);
app.use('/auth', authRoutes);

export default app;
