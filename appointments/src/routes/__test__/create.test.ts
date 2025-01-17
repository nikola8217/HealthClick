import axios from "axios";
import mongoose from "mongoose";
import { createAppointment } from "../../test/helpers";

jest.mock('axios');

describe('Create appointment', () => {
    const doctorId = new mongoose.Types.ObjectId().toHexString();
    const patientId = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('returns a 401 if user is not authenticated', async () => {
        await createAppointment(doctorId, patientId, new Date('2024-10-305T10:30:00'), false).expect(401);
    });

    it('returns a 400 if not all required fields are filled', async () => {
        await createAppointment('', patientId, new Date('2024-10-305T10:30:00'), true).expect(400);
        await createAppointment(doctorId, '', new Date('2024-10-305T10:30:00'), true).expect(400);
        await createAppointment(doctorId, patientId, new Date('invalid-date'), true).expect(400);
    });

    it('returns a 400 if time format is not valid', async () => {
        await createAppointment(doctorId, patientId, new Date('invalid-date'), true).expect(400);
    });

    it('returns a 400 if time is in the past', async () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); 
        await createAppointment(doctorId, patientId, yesterday, true).expect(400);
    });

    it('returns a 400 if time is outside of 08:00-21:00 range', async () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(22, 0, 0); 
    
        await createAppointment(doctorId, patientId, tomorrow, true).expect(400);
    });

    it('returns a 400 if doctor does not exist', async () => {
        (axios.get as jest.Mock).mockRejectedValue({
            response: { status: 404 },
        });

        const tomorrow = new Date();

        await createAppointment(doctorId, patientId, tomorrow, true).expect(400);
    });

    it('returns a 400 if patient does not exist', async () => {
        (axios.get as jest.Mock).mockRejectedValue({
            response: { status: 404 },
        });

        const tomorrow = new Date();

        await createAppointment(doctorId, patientId, tomorrow, true).expect(400);
    });

    it('returns a 201 if appointment is successfully created', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        await createAppointment(doctorId, patientId, tomorrow, true).expect(201);
    });

    it('returns a 400 if doctor already have appointment in that time', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        await createAppointment(doctorId, patientId, tomorrow, true).expect(201);
        await createAppointment(doctorId, patientId, tomorrow, true).expect(400);
    });
});