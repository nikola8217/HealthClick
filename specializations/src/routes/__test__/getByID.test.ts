import mongoose from 'mongoose';
import { getByIDSpecialization, createSpecialization } from '../../test/helpers';

describe('Get by id specialization', () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    it('returns a 401 if user is not authenticated', async () => {
        await getByIDSpecialization(id, false).expect(401);
    });

    it('returns a 400 if specialization does not exists', async () => {
        await getByIDSpecialization(id, true).expect(400);
    });

    it('returns a 200 if specialization is found', async () => {
        const specialization = await createSpecialization('test', true).expect(201);

        await getByIDSpecialization(specialization.body._id, true).expect(200);
    });
});



