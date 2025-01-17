import { getAllDoctors, createDoctor } from "../../test/helpers";
import axios from 'axios';
import mongoose from 'mongoose';

jest.mock('axios');

describe('Get all doctors', () => {
    const specializationId = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('return a 401 if user is not authenticated', async () => {
        await getAllDoctors(false).expect(401);
    });

    it('returns a 200 if can fetch all doctors', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationId, name: 'Cardiology' },
        });

        await createDoctor('test1', 'test1', 5, 2021, specializationId, true).expect(201);
        await createDoctor('test2', 'test2', 5, 2021, specializationId, true).expect(201);
        await createDoctor('test3', 'test3', 5, 2021, specializationId, true).expect(201);

        await getAllDoctors(true).expect(200);
    });
});