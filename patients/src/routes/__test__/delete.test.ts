import mongoose from 'mongoose';
import { deletePatient, createPatient } from '../../test/helpers';
import axios from 'axios';

jest.mock('axios');

describe('Delete patient', () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    it('returns a 401 if user is not authenticated', async () => {
        await deletePatient(id, false).expect(401);
    });

    it('returns a 400 if patient does not exists', async () => {
        await deletePatient(id, true).expect(400);
    });

    it('returns a 200 if patient is successfully delete', async () => {
        const patient = await createPatient({name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, true).expect(201);

        // creating appointment simulation
        (axios.post as jest.Mock).mockResolvedValue({
            data: { id: 'appointment-id', doctorId: 'doctor-id', patientId: patient.body._id },
        });

        // deleting appointment simulation
        (axios.delete as jest.Mock).mockResolvedValue({
            status: 200, 
        });

        await deletePatient(patient.body._id, true).expect(200);
    });
});

