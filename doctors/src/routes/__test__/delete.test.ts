import { createDoctor, deleteDoctor } from "../../test/helpers";
import axios from 'axios';
import mongoose from 'mongoose';

jest.mock('axios');

describe('Delete doctor', () => {
    const specializationId = new mongoose.Types.ObjectId().toHexString();
    const doctorId = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('return a 401 if user is not authenticated', async () => {
        await deleteDoctor(doctorId, false).expect(401);
    });

    it('returns a 400 if doctor does not exist', async () => {
        await deleteDoctor(doctorId, true).expect(400);
    });

    it('returns a 200 if doctor is successfully deleted', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationId, name: 'testCategory' },
        });

        const doctor = await createDoctor('test', 'test', 5, 2021, specializationId, true).expect(201);

        // creating appointment simulation
        (axios.post as jest.Mock).mockResolvedValue({
            data: { id: 'appointment-id', doctorId: doctor.body._id, patientId: 'patient-id' },
        });

        // deleting appointment simulation
        (axios.delete as jest.Mock).mockResolvedValue({
            status: 200, 
        });

        await deleteDoctor(doctor.body._id, true).expect(200);
    });
});