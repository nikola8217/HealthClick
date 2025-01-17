import axios from 'axios';
import mongoose from 'mongoose';
import { createDoctor } from '../../test/helpers';

jest.mock('axios');

describe('Create doctor', () => {
    const specializationId = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('returns a 401 if user is not authenticated', async () => {
        await createDoctor('test', 'test', 5, 2021, specializationId, false).expect(401);
    });

    it('returns 400 if not all required fields are filled', async () => {
        await createDoctor('', 'test', 5, 2021, specializationId, true).expect(400);
        await createDoctor('test', '', 5, 2021, specializationId, true).expect(400);
        await createDoctor('test', 'test', '', 2021, specializationId, true).expect(400);
        await createDoctor('test', 'test', 5, '', specializationId, true).expect(400);
        await createDoctor('test', 'test', 5, 2021, '', true).expect(400);
    });

    it('returns 400 if yearsOfExpiriens or yearOfEmployment are not a number', async () => {
        await createDoctor('test', 'test','five', 2021, specializationId, true).expect(400);
        await createDoctor('test', 'test', 5, 'five', specializationId, true).expect(400);
    });

    it('returns a 400 if specialization does not exist', async () => {
        (axios.get as jest.Mock).mockRejectedValue({
            response: { status: 404 },
        });

        await createDoctor('test', 'test', 5, 2021, specializationId, true).expect(400);
    });

    it('returns a 201 if doctor is successfully created', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: specializationId, name: 'Cardiology' },
        });

        await createDoctor('test', 'test', 5, 2021, specializationId, true).expect(201);
    });
});