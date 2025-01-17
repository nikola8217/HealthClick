import { createPatient } from "../../test/helpers"

describe('Create patient', () => {
    it('returns a 401 if user is not authenticated', async () => {
        await createPatient({name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, false).expect(401);
    });
    
    it('returns a 400 if all required fields are not filled', async () => {
        await createPatient({name: '', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, true).expect(400);
        await createPatient({name: 'Test', address: '', dateOfBirth: new Date('1995-05-05')}, true).expect(400);
        await createPatient({name: 'Test', address: 'Belgrade', dateOfBirth: new Date('invalid-date')}, true).expect(400); 
    });
    
    it('returns a 400 if dateOfBirth format is invalid', async () => {
        await createPatient({name: 'Test', address: 'Belgrade', dateOfBirth: new Date('invalid-date')}, true).expect(400); 
    });
    
    it('returns a 201 if patient is successfully created', async () => {
        await createPatient({name: 'Test', address: 'Belgrade', dateOfBirth: new Date('1995-05-05')}, true).expect(201);
    });
});

