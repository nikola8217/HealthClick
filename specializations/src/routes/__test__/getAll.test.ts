import { createSpecialization, getAllSpecializations } from '../../test/helpers';

describe('Get all specializations', () => {
    it('returns a 401 if user is not authenticated', async () => {
        await getAllSpecializations(false).expect(401);
    });
    
    it('returns a 200 if can fetch all specializations', async () => {
        await createSpecialization('test1', true);
        await createSpecialization('test2', true);
        await createSpecialization('test3', true);
      
        await getAllSpecializations(true).expect(200);
    });
});

