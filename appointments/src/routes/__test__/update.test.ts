import axios from "axios";
import mongoose from "mongoose";
import { createAppointment, updateAppointment } from "../../test/helpers";

jest.mock('axios');

describe('Update appointment', () => {
    const doctorId = new mongoose.Types.ObjectId().toHexString();
    const patientId = new mongoose.Types.ObjectId().toHexString();
    const doctorIdNew = new mongoose.Types.ObjectId().toHexString();
    const patientIdNew = new mongoose.Types.ObjectId().toHexString();
    const appointmentId = new mongoose.Types.ObjectId().toHexString();

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('returns a 401 if user is not authenticated', async () => {
        await updateAppointment(appointmentId, doctorId, patientId, new Date('2024-10-305T10:30:00'), false).expect(401);
    });

    it('returns a 400 if appointment does not exist', async () => {
        await updateAppointment(appointmentId, doctorId, patientId, new Date('2024-10-305T10:30:00'), true).expect(400);
    });

    it('returns a 400 if not all required fields are filled', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);

        await updateAppointment(appointment.body._id, '', patientId, new Date('2024-10-305T10:30:00'), true).expect(400);
        await updateAppointment(appointment.body._id, doctorId, '', new Date('2024-10-305T10:30:00'), true).expect(400);
        await updateAppointment(appointment.body._id, doctorId, patientId, new Date('invalid-date'), true).expect(400);
    });

    it('returns a 400 if time format is not valid', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);

        await updateAppointment(appointment.body._id, doctorId, patientId, new Date('invalid-date'), true).expect(400);
    });

    it('returns a 400 if time is in the past', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); 

        await updateAppointment(appointment.body._id, doctorId, patientId, yesterday, true).expect(400);
    });

    it('returns a 400 if time is outside of 08:00-21:00 range', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);

        const tomorrowNew = new Date();
        tomorrowNew.setDate(tomorrow.getDate() + 1); 
        tomorrowNew.setHours(22, 0, 0); 
    
        await updateAppointment(appointment.body._id, doctorId, patientId, tomorrowNew, true).expect(400);
    });

    it('returns a 400 if doctor does not exist', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);

        (axios.get as jest.Mock).mockRejectedValue({
            response: { status: 404 },
        });

        const tomorrowNew = new Date();

        await updateAppointment(appointment.body._id, doctorIdNew, patientId, tomorrowNew, true).expect(400);
    });

    it('returns a 400 if patient does not exist', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);

        (axios.get as jest.Mock).mockRejectedValue({
            response: { status: 404 },
        });

        const tomorrowNew = new Date();

        await updateAppointment(appointment.body._id, doctorId, patientIdNew, tomorrowNew, true).expect(400);
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

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);
        await updateAppointment(appointment.body._id, doctorId, patientId, tomorrow, true).expect(400);
    });

    it('returns a 200 if appointment is successfully updated', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorId, name: 'testDoctor' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientId, name: 'testPatient' },
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(20, 0, 0); 

        const appointment = await createAppointment(doctorId, patientId, tomorrow, true).expect(201);

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: doctorIdNew, name: 'testDoctorUpd' },
        });

        (axios.get as jest.Mock).mockResolvedValue({
            data: { id: patientIdNew, name: 'testPatientUpd' },
        });

        const tomorrowNew = new Date();
        tomorrowNew.setDate(tomorrowNew.getDate() + 1); 
        tomorrowNew.setHours(21, 0, 0); 

        await updateAppointment(appointment.body._id, doctorIdNew, patientIdNew, tomorrowNew, true).expect(200);
    });

});