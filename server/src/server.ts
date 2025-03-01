import express from 'express';
import router from './routes/router';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import 'dotenv/config';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
connectDB();

const app = express();

//Cors
app.use(cors(corsConfig));
app.use(express.json());

app.use('/', router);
app.use('/auth', authRoutes);

export default app;
