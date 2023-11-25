import { Request } from "express";
import { CreateOrUpdateDoctor } from "../interfaces/doctor.interface";
import { DoctorRepository } from "../repositories/doctor.repository";
import { SpecializationRepository } from "../repositories/specialization.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { isValidObjectId } from "mongoose";

export class DoctorService {
    static async createDoctor(req: Request) {
        this.checkSpecialization(req.body.specialization);

        const doctorData: CreateOrUpdateDoctor = {
            name: req.body.name,
            education: req.body.education,
            yearsOfExpirience: req.body.yearsOfExpirience,
            yearOfEmployment: req.body.yearOfEmployment,
            specialization: req.body.specialization
        };

        const doctor = await DoctorRepository.createDoctor(doctorData);

        return doctor;
    }

    static async findDoctorByID(req: Request) {
        const doctor = this.checkDoctor(req.params.id);

        return doctor;
    }

    static async updateDoctor(req: Request) {
        this.checkDoctor(req.params.id);

        if (req.body.specialization) {
            this.checkSpecialization(req.body.specialization);
        }

        const doctorData: CreateOrUpdateDoctor = {
            name: req.body.name,
            education: req.body.education,
            yearsOfExpirience: req.body.yearsOfExpirience,
            yearOfEmployment: req.body.yearOfEmployment,
            specialization: req.body.specialization
        };

        const doctor = await DoctorRepository.updateDoctor(req.params.id, doctorData);

        return doctor;
    }

    static async deleteDoctor(req: Request) {
        this.checkDoctor(req.params.id);

        await DoctorRepository.deleteDoctor(req.params.id);
    }

    private static async checkSpecialization(specialization: string) {
        if (!isValidObjectId(specialization)) {
            throw new BadRequestError('Specialization does not exist')
        }

        const specializationExists = await SpecializationRepository.getSpecializationById(specialization);

        if (!specializationExists) {
            throw new BadRequestError('Specialization does not exist');
        }

        return specializationExists;
    }

    private static async checkDoctor(doctor: string) {
        if (!isValidObjectId(doctor)) {
            throw new BadRequestError('Doctor does not exist')
        }

        const doctorExists = await DoctorRepository.getDoctorById(doctor);

        if (!doctorExists) {
            throw new BadRequestError('Doctor does not exist');
        }

        return doctorExists;
    }
}