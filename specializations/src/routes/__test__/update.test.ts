import mongoose from 'mongoose';
import { updateSpecialization, createSpecialization } from '../../test/helpers';

describe('Update specialization', () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    it('returns a 401 if user is not authenticated', async () => {
        await updateSpecialization(id, 'testUpd', false).expect(401);
    });

    it('returns a 400 if specialization does not exists', async () => {
        await updateSpecialization(id, 'testUpd', true).expect(400);
    });

    it('returns a 400 if name is not provided', async () => {
        const specialization = await createSpecialization('test', true).expect(201);

        await updateSpecialization(specialization.body._id, '', true).expect(400);
    });

    it('returns a 400 if specialization already exists', async () => {
        const specialization1 = await createSpecialization('test1', true).expect(201);
        const specialization2 = await createSpecialization('test2', true).expect(201);

        await updateSpecialization(specialization1.body._id, specialization2.body.name, true).expect(400);
    });

    it('returns a 200 if specialization is successfully updated', async () => {
        const specialization = await createSpecialization('test', true).expect(201);

        await updateSpecialization(specialization.body._id, 'testUpd', true).expect(200);
    });
});

