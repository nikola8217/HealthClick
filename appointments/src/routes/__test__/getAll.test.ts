import { getAllAppointments, createAppointment } from '../../test/helpers';
import axios from 'axios';
import mongoose from 'mongoose';

jest.mock('axios');

describe('Get all appointments', () => {
    const doctorId = new mongoose.Types.ObjectId().toHexString();
    const patientId = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('return a 401 if user is not authenticated', async () => {
        await getAllAppointments(false).expect(401);
    });

    it('returns a 200 if can fetch all appointments', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const date1 = new Date();
        date1.setDate(date1.getDate() + 1); 
        date1.setHours(18, 0, 0); 

        const date2 = new Date();
        date2.setDate(date2.getDate() + 1); 
        date2.setHours(19, 0, 0); 

        const date3 = new Date();
        date3.setDate(date3.getDate() + 1); 
        date3.setHours(20, 0, 0); 

        await createAppointment(doctorId, patientId, date1, true).expect(201);
        await createAppointment(doctorId, patientId, date2, true).expect(201);
        await createAppointment(doctorId, patientId, date3, true).expect(201);

        await getAllAppointments(true).expect(200);
    });
});