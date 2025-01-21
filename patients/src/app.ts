import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import { patientRouter } from './routes/patient.routes';
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

app.use('/api/patients', patientRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export { app };