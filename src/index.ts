import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes';
import { specializationRouter } from './routes/specialization.routes';
import { doctorRouter } from './routes/doctor.routes';
import { patientRouter } from './routes/patient.routes';
import { pricelistRouter } from './routes/pricelist.routes';
import { appointmentRouter } from './routes/appointment.routes';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from 'cookie-session';

dotenv.config();

const app = express();
app.use(express.json());
app.set('trust proxy', true);

app.use(cookieSession({
    signed: false,
}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/specializations', specializationRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/pricelists', pricelistRouter);
app.use('/api/v1/appointments', appointmentRouter);

app.use(errorHandler);

const port = process.env.PORT;

const start = async () => {
    const dbConnectionString = process.env.MONGO_URI;

    if (!dbConnectionString) {
        console.log("MONGO_URI is not defined in the environment.");
        return;
    }

    try {
        await connectDB(dbConnectionString);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        
    }
};

start();