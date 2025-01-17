import { Request } from 'express';
import { BadRequestError } from '@healthclickapp/shared';
import { CreateOrUpdateDoctor } from '../interfaces/doctor.interface';
import { DoctorRepository } from '../repositories/doctor.repository';
import { SpecializationHandler } from './specialization.handler';
import { isValidObjectId } from 'mongoose';
import { AppointmentsHandler } from './appointment.handler';

export class DoctorHandler {
    private static async getToken(req: Request) : Promise<string> {
        return req.headers.authorization || '';
    }

    static async createDoctor(req: Request) {
        const token = await this.getToken(req);

        await SpecializationHandler.getSpecialization(token, req.body.specialization);

        const doctorData = await this.prepareDoctorData(req);

        const doctor = await DoctorRepository.createDoctor(doctorData);

        return doctor;
    }

    private static async prepareDoctorData(req: Request) {
        const data: CreateOrUpdateDoctor = {
            name: req.body.name,
            education: req.body.education,
            yearsOfExpirience: req.body.yearsOfExpirience,
            yearOfEmployment: req.body.yearOfEmployment,
            specialization: req.body.specialization
        };

        return data;
    }

    static async getAllDoctors(req: Request) {
        const cookie = await this.getToken(req);

        const doctors = await DoctorRepository.getAllDoctors(); 
    
        const doctorsUpd = await Promise.all(doctors.map(async (doctor) => {
            const specialization = await SpecializationHandler.getSpecialization(cookie, doctor.specialization);
    
            return {
                _id: doctor._id,
                name: doctor.name,
                education: doctor.education,
                yearsOfExpirience: doctor.yearsOfExpirience,
                yearOfEmployment: doctor.yearOfEmployment,
                specialization: specialization.data 
            };
        }));
    
        return doctorsUpd; 
    }

    static async getDoctorByID(req: Request) {
        const cookie = await this.getToken(req);

        const doctor = await this.checkDoctor(req.params.id);

        const specialization = await SpecializationHandler.getSpecialization(cookie, doctor.specialization);
       
        return {
            _id: doctor._id,
            name: doctor.name,
            education: doctor.education,
            yearsOfExpirience: doctor.yearsOfExpirience,
            yearOfEmployment: doctor.yearOfEmployment,
            specialization: specialization.data
        };
    }

    static async updateDoctor(req: Request) {
        const cookie = await this.getToken(req);

        await this.checkDoctor(req.params.id);

        await SpecializationHandler.getSpecialization(cookie, req.body.specialization);

        const doctorData = await this.prepareDoctorData(req);

        const doctor = await DoctorRepository.updateDoctor(req.params.id, doctorData);

        return doctor;
    }

    static async deleteDoctor(req: Request) {
        const cookie = await this.getToken(req);

        await this.checkDoctor(req.params.id);

        await AppointmentsHandler.deleteAppointments(cookie, req.params.id);

        await DoctorRepository.deleteDoctor(req.params.id);
    }

    private static async checkDoctor(id: string) {
        if (!isValidObjectId(id)) {
            throw new BadRequestError('Doctor does not exist')
        }

        const doctorExists = await DoctorRepository.getDoctorById(id);

        if (!doctorExists) {
            throw new BadRequestError('Doctor does not exist');
        }

        return doctorExists;
    }

    static async deleteDoctorBySpecialization(req: Request) {
        const cookie = await this.getToken(req);
    
        const doctors = await DoctorRepository.getDoctorsBySpecialization(req.params.specializationId);

        if (doctors) {
            const doctorIds = doctors.map((doctor) => String(doctor._id));

            for (const doctorId of doctorIds) {
                await AppointmentsHandler.deleteAppointments(cookie, doctorId);
            }

            await DoctorRepository.deleteDoctorsBySpecialization(req.params.specializationId);
        }
    }
}