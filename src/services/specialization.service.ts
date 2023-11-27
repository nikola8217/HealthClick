import { Request } from "express";
import { SpecializationRepository } from '../repositories/specialization.repository';
import { BadRequestError } from "../errors/bad-request-error";
import { CreateOrUpdateSpecialization } from "../interfaces/specialization.interface";
import { isValidObjectId } from "mongoose";

export class SpecializationService {
    static async createSpecialization(req: Request) {
        const existingSpec = await SpecializationRepository.findByName(req.body.name);

        if (existingSpec) {
            throw new BadRequestError('Specialization already exists');
        }

        const specializationData: CreateOrUpdateSpecialization = {
            name: req.body.name
        };

        const specialization = await SpecializationRepository.createSpecialization(specializationData);

        return specialization;
    }

    static async findSpecializationByID(req: Request) {
        const specialization = await this.checkSpecialization(req.params.id);

        return specialization;
    }

    static async updateSpecialization(req: Request) {
        await this.checkSpecialization(req.params.id);

        const nameTaken = await SpecializationRepository.findOtherByName(req.params.id, req.body.name);

        if (nameTaken) {
            throw new BadRequestError('Specialization already exists');
        }

        const allowedFields = ['name'];
        const specializationData: CreateOrUpdateSpecialization = {};

        for (const field of allowedFields) {
            if (req.body[field]) {
                specializationData[field] = req.body[field];
            }
        }

        const specialization = await SpecializationRepository.updateSpecialization(req.params.id, specializationData);

        return specialization;
    }

    static async deleteSpecialization(req: Request) {
        await this.checkSpecialization(req.params.id);

        await SpecializationRepository.deleteSpecialization(req.params.id);
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
}