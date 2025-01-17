import { Request } from 'express';
import { PatientHandler } from './patient.handler';
import { DoctorHandler } from './doctor.handler';
import { CreateOrUpdateAppointment } from '../interfaces/appoinment.interface';
import { AppointmentRepository } from '../repositories/appointment.repository';
import { BadRequestError } from '@healthclickapp/shared';
import { isValidObjectId } from 'mongoose';

export class AppointmentHandler {
    private static async getToken(req: Request) : Promise<string> {
        return req.headers.authorization || '';
    }

    static async createAppointment(req: Request) {
        const cookie = await this.getToken(req);

        await PatientHandler.getPatient(cookie, req.body.patient);

        await DoctorHandler.getDoctor(cookie, req.body.doctor);

        await this.checkAppointmentTime(req.body.time, req.body.doctor);

        const appointmentData = await this.prepareAppointmentData(req);

        const appointment = await AppointmentRepository.createAppointment(appointmentData);

        return appointment;
    }

    private static async checkAppointmentTime(time: Date, doctor: string) {
        await this.checkIsFutureDate(time);

        await this.checkIsWorkingHours(time);

        await this.checkIfDoctorHasAppointent(time, doctor)
    }

    private static async checkIsFutureDate(time: Date) {
        const currentDate = new Date();

        if (time < currentDate) {
            throw new BadRequestError('Invalid date. Please choose a date in the future.');
        }
    }

    private static async checkIsWorkingHours(time: Date) {
        const startWorkingHours = 8 * 60; 
        const endWorkingHours = 21 * 60; 
    
        const appointmentTime = time.getHours() * 60 + time.getMinutes(); 
    
        if (appointmentTime < startWorkingHours || appointmentTime > endWorkingHours) {
            throw new BadRequestError('Doctor works between 08:00 and 21:00. Please choose a valid time.');
        }
    }

    private static async checkIfDoctorHasAppointent(time: Date, doctor: string) {
        const startDateTime = new Date(time);
        const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

        const existingAppointment = await AppointmentRepository.findAppointmentByDoctorDateTime(doctor, startDateTime, endDateTime);

        if (existingAppointment) {
            throw new BadRequestError('Doctor already has an appointment at the specified time.');
        }
    }

    private static async prepareAppointmentData(req: Request) {
        const data: CreateOrUpdateAppointment = {
            patient: req.body.patient,
            doctor: req.body.doctor,
            time: req.body.time
        };

        return data;
    }

    static async getAllAppointments(req: Request) {
        const cookie = await this.getToken(req);

        const appointments = await AppointmentRepository.getAllAppointments();

        const appointmentsUpd = await Promise.all(appointments.map(async (appointment) => {
            const patient = await PatientHandler.getPatient(cookie, appointment.patient);

            const doctor = await DoctorHandler.getDoctor(cookie, appointment.doctor);
    
            return {
                _id: appointment._id,
                patient: patient.data,
                doctor: doctor.data,
                time: appointment.time,
                status: appointment.status
            };
        }));
    
        return appointmentsUpd; 
    }

    static async getAppoinmentByID(req: Request) {
        const cookie = await this.getToken(req);

        const appoinment = await this.checkAppointment(req.params.id);

        const patient = await PatientHandler.getPatient(cookie, appoinment.patient);

        const doctor = await DoctorHandler.getDoctor(cookie, appoinment.doctor);
       
        return {
            _id: appoinment._id,
            patient: patient.data,
            doctor: doctor.data,
            time: appoinment.time,
            status: appoinment.status
        };
    }

    private static async checkAppointment(id: string) {
        if (!isValidObjectId(id)) {
            throw new BadRequestError('Appointment does not exist')
        }

        const appoinmentExists = await AppointmentRepository.getAppointmentById(id);

        if (!appoinmentExists) {
            throw new BadRequestError('Appointment does not exist');
        }

        return appoinmentExists;
    }

    static async updateAppointment(req: Request) {
        const cookie = await this.getToken(req);

        await this.checkAppointment(req.params.id);

        await PatientHandler.getPatient(cookie, req.body.patient);

        await DoctorHandler.getDoctor(cookie, req.body.doctor);

        await this.checkAppointmentTime(req.body.time, req.body.doctor);

        const appointmentData = await this.prepareAppointmentData(req);

        const appointment = await AppointmentRepository.updateAppointment(req.params.id, appointmentData);

        return appointment;
    }

    static async deleteAppointment(req: Request) {
        await this.checkAppointment(req.params.id);

        await AppointmentRepository.deleteAppointment(req.params.id);
    }

    static async updateStatus(req: Request) {
        await this.checkAppointment(req.params.id);

        const appointment = await AppointmentRepository.updateStatus(req.params.id, req.body.status);

        return appointment;
    }

    static async deleteAppointmentByPatient(req: Request) {
        const patients = await AppointmentRepository.getAppointmentsByPatient(req.params.patientId);

        if (patients) {
            await AppointmentRepository.deleteAppointmentsByPatient(req.params.patientId);
        }
    }

    static async deleteAppointmentByDoctor(req: Request) {
        const appointments = await AppointmentRepository.getAppointmentsByDoctor(req.params.doctorId);

        if (appointments) {
            await AppointmentRepository.deleteAppointmentByDoctor(req.params.doctorId);
        }
    }
}