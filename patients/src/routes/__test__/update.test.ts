import mongoose from 'mongoose';
import { updatePatient, createPatient } from '../../test/helpers';

describe('Update patient', () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    it('returns a 401 if user is not authenticated', async () => {
        await updatePatient(id, {name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, false).expect(401);
    });

    it('returns a 400 if patient does not exists', async () => {
        await updatePatient(id, {name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, true).expect(400);
    });

    it('returns a 400 if all required fields are not filled', async () => {
        const patient = await createPatient({name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, true).expect(201);
        
        await updatePatient(patient.body._id, {name: '', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, true).expect(400);
        await updatePatient(patient.body._id, {name: 'Test', address: '', dateOfBirth: new Date('1995-05-05')}, true).expect(400);
        await updatePatient(patient.body._id, {name: 'Test', address: 'Belgrade', dateOfBirth: new Date('invalid-date')}, true).expect(400); 
    });

    it('returns a 200 if patient is successfully updated', async () => {
        const patient = await createPatient({name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, true).expect(201);
        
        await updatePatient(patient.body._id, {name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, true).expect(200);
    });
});

