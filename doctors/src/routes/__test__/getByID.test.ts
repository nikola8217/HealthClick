import { createDoctor, getByIDDoctor } from "../../test/helpers";
import axios from 'axios';
import mongoose from 'mongoose';

jest.mock('axios');

describe('Get doctor by id', () => {
    const specializationId = new mongoose.Types.ObjectId().toHexString();
    const doctorId = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('return a 401 if user is not authenticated', async () => {
        await getByIDDoctor(doctorId, false).expect(401);
    });

    it('returns a 400 if doctor does not exist', async () => {
        await getByIDDoctor(doctorId, true).expect(400);
    });

    it('returns a 200 if doctor is found', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationId, name: 'testCategory' },
        });

        const doctor = await createDoctor('test', 'test', 5, 2021, specializationId, true).expect(201);

        await getByIDDoctor(doctor.body._id, true).expect(200);
    });
});