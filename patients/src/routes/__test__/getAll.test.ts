import { createPatient, getAllPatients } from '../../test/helpers';

describe('Get all patients', () => {
    it('returns a 401 if user is not authenticated', async () => {
        await getAllPatients(false).expect(401);
    });
    
    it('returns a 200 if can fetch all patients', async () => {
        await createPatient({name: 'Test1', address: 'Belgrade', dateOfBirth: new Date('1997-07-07T00:00:00')}, true).expect(201);
        await createPatient({name: 'Test2', address: 'Novi Sad', dateOfBirth: new Date('1997-07-07T00:00:00')}, true).expect(201);
        await createPatient({name: 'Test3', address: 'Pozarevac', dateOfBirth: new Date('1995-05-05T00:00:00')}, true).expect(201);
      
        await getAllPatients(true).expect(200);
    });
});

