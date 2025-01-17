import { createDoctor, updateDoctor } from "../../test/helpers";
import axios from 'axios';
import mongoose from 'mongoose';

jest.mock('axios');

describe('Update doctor', () => {
    const specializationId = new mongoose.Types.ObjectId().toHexString();
    const doctorId = new mongoose.Types.ObjectId().toHexString();
    const specializationIdNew = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('return a 401 if user is not authenticated', async () => {
        await updateDoctor(doctorId, 'testupd', 'testupd', 5, 2021, specializationId, false).expect(401);
    });

    it('returns a 400 if doctor does not exist', async () => {
        await updateDoctor(doctorId, 'testupd', 'testupd', 5, 2021, specializationId, true).expect(400);
    });

    it('returns 400 if not all required fields are filled', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationId, name: 'testCategory' },
        });

        const doctor = await createDoctor('test', 'test', 5, 2021, specializationId, true).expect(201);

        await updateDoctor(doctor.body._id, '', 'testupd', 5, 2021, specializationId, true).expect(400);
        await updateDoctor(doctor.body._id, 'testupd', '', 5, 2021, specializationId, true).expect(400);
        await updateDoctor(doctor.body._id, 'testupd', 'testupd', '', 2021, specializationId, true).expect(400);
        await updateDoctor(doctor.body._id, 'testupd', 'testupd', 5, '', specializationId, true).expect(400);
        await updateDoctor(doctor.body._id, 'testupd', 'testupd', 5, 2021, '', true).expect(400);
    });

    it('returns 400 if yearsOfExpiriens or yearOfEmployment are not a number', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationId, name: 'testCategory' },
        });

        const doctor = await createDoctor('test', 'test', 5, 2021, specializationId, true).expect(201);
        
        await updateDoctor(doctor.body._id, 'testupd', 'testupd', 'five', 2021, specializationId, true).expect(400);
        await updateDoctor(doctor.body._id, 'testupd', 'testupd', 5, 'five', specializationId, true).expect(400);
    });

    it('returns a 400 if specialization does not exist', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationId, name: 'testCategory' },
        });

        const doctor = await createDoctor('test', 'test', 5, 2021, specializationId, true).expect(201);

        (axios.get as jest.Mock).mockRejectedValue({
            response: { status: 404 },
        });

        await updateDoctor(doctor.body._id, 'testupd', 'testupd', 5, 2021, specializationIdNew, true).expect(400);
    });

    it('returns a 200 if doctor is successfully updated', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationId, name: 'testCategory' },
        });

        const doctor = await createDoctor('test', 'test', 5, 2021, specializationId, true).expect(201);

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationIdNew, name: 'testCategoryNew' },
        });

        await updateDoctor(doctor.body._id, 'testupd', 'testupd', 5, 2021, specializationIdNew, true).expect(200);
    });
});