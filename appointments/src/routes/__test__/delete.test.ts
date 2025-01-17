import { createAppointment, deleteAppointment } from '../../test/helpers';
import axios from 'axios';
import mongoose from 'mongoose';

jest.mock('axios');

describe('Delete appointment', () => {
    const doctorId = new mongoose.Types.ObjectId().toHexString();
    const patientId = new mongoose.Types.ObjectId().toHexString();
    const appointmentId = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('return a 401 if user is not authenticated', async () => {
        await deleteAppointment(appointmentId, false).expect(401);
    });

    it('returns a 400 if appointment does not exist', async () => {
        await deleteAppointment(appointmentId, true).expect(400);
    });

    it('returns a 200 if doctor is successfully deleted', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);

        await deleteAppointment(appointment.body._id, true).expect(200);
    });
});