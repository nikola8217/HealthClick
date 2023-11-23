import { Request } from "express";
import { CreateOrUpdateDoctor } from "../interfaces/doctor.interface";
import { DoctorRepository } from "../repositories/doctor.repository";
import { SpecializationRepository } from "../repositories/specialization.repository";
import { BadRequestError } from "../errors/bad-request-error";

export class DoctorService {
    static async createDoctor(req: Request) {
        const specializationExists = await SpecializationRepository.findById(req.body.specialization);

        if (!specializationExists) {
            throw new BadRequestError('Specialization does not exist');
        }

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
        const doctor = await DoctorRepository.findDoctorById(req.params.id);

        if (!doctor) {
            throw new BadRequestError('Doctor does not exist');
        }

        return doctor;
    }

    static async updateDoctor(req: Request) {
        const doctorExists = await DoctorRepository.findDoctorById(req.params.id);

        if (!doctorExists) {
            throw new BadRequestError('Doctor does not exist');
        }

        const specializationExists = await SpecializationRepository.findById(req.body.specialization);

        if (!specializationExists) {
            throw new BadRequestError('Specialization does not exist');
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
        const doctorExists = await DoctorRepository.findDoctorById(req.params.id);

        if (!doctorExists) {
            throw new BadRequestError('Doctor does not exist');
        }

        await DoctorRepository.deleteDoctor(req.params.id);
    }
}