import { createSpecialization } from "../../test/helpers";

describe('Create specialization', () => {
    it('returns a 401 if user is not authenticated', async () => {
        await createSpecialization('test', false);
    });
    
    it('returns a 400 if name is not provided', async () => {
        await createSpecialization('', true).expect(400);
    });
    
    it('returns a 201 if specialization is successfully created', async () => {
        await createSpecialization('test', true).expect(201);
    });
    
    it('returns a 400 if specialization already exists', async () => {
        await createSpecialization('test', true).expect(201);
        await createSpecialization('test', true).expect(400);
    });
});

