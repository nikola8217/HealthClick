import { Request } from "express";
import { SpecializationRepository } from '../repositories/specialization.repository';
import { BadRequestError } from "../errors/bad-request-error";
import { CreateSpecialization } from "../interfaces/specialization.interface";
import { isValidObjectId } from "mongoose";

export class SpecializationService {
    static async createSpecialization(req: Request) {
        const existingSpec = await SpecializationRepository.findByName(req.body.name);

        if (existingSpec) {
            throw new BadRequestError('Specialization already exists');
        }

        const specializationData: CreateSpecialization = {
            name: req.body.name
        };

        const specialization = await SpecializationRepository.createSpecialization(specializationData);

        return specialization;
    }

    static async findSpecializationByID(req: Request) {
        const specialization = this.checkSpecialization(req.params.id);

        return specialization;
    }

    static async updateSpecialization(req: Request) {
        this.checkSpecialization(req.params.id);

        const nameTaken = await SpecializationRepository.findOtherByName(req.params.id, req.body.name);

        if (nameTaken) {
            throw new BadRequestError('Specialization already exists');
        }

        const specializationData: CreateSpecialization = {
            name: req.body.name
        };

        const specialization = await SpecializationRepository.updateSpecialization(req.params.id, specializationData);

        return specialization;
    }

    static async deleteSpecialization(req: Request) {
        this.checkSpecialization(req.params.id);

        await SpecializationRepository.deleteSpecialization(req.params.id);
    }

    private static async checkSpecialization(pricelist: string) {
        if (!isValidObjectId(pricelist)) {
            throw new BadRequestError('Specialization does not exist')
        }

        const specializationExists = await SpecializationRepository.getSpecializationById(pricelist);

        if (!specializationExists) {
            throw new BadRequestError('Specialization does not exist');
        }

        return specializationExists;
    }
}