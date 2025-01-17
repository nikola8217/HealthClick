import mongoose from 'mongoose';
import { getByIDPatient, createPatient } from '../../test/helpers';

describe('Get by id patient', () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    it('returns a 401 if user is not authenticated', async () => {
        await getByIDPatient(id, false).expect(401);
    });

    it('returns a 400 if patient does not exists', async () => {
        await getByIDPatient(id, true).expect(400);
    });

    it('returns a 200 if patient is found', async () => {
        const patient = await createPatient({name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05T00:00:00')}, true).expect(201);

        await getByIDPatient(patient.body._id, true);
    });
});



