import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes';
import { errorHandler } from '@healthclickapp/shared';
import cookieSession from 'cookie-session';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.set('trust proxy', true);

app.use(cors());

app.use(cookieSession({
    signed: false,
}));

app.use('/api/users', userRouter);

app.use(errorHandler);

export { app };