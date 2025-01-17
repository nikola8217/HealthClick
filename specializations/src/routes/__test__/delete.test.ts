import mongoose from 'mongoose';
import { deleteSpecialization, createSpecialization } from '../../test/helpers';
import axios from 'axios';

jest.mock('axios');

describe('Delete specialization', () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    it('returns a 401 if user is not authenticated', async () => {
        await deleteSpecialization(id, false).expect(401);
    });

    it('returns a 400 if specialization does not exists', async () => {
        await deleteSpecialization(id, true).expect(400);
    });

    it('returns a 200 if specialization is successfully delete', async () => {
        const specialization = await createSpecialization('test', true).expect(201);

        // creating doctor simulation
        (axios.post as jest.Mock).mockResolvedValue({
            data: { id: 'doctor-id', name: 'Dr. Test', specializationId: specialization.body._id },
        });

        // deleting doctor simulation
        (axios.delete as jest.Mock).mockResolvedValue({
            status: 200, 
        });

        await deleteSpecialization(specialization.body._id, true).expect(200);
        
    });
});

