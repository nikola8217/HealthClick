import { Request } from "express";
import { SpecializationRepository } from '../repositories/specialization.repository';
import { BadRequestError } from "../errors/bad-request-error";
import { CreateSpecialization } from "../interfaces/specialization.interface";

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

    static async updateSpecialization(req: Request) {
        const existingSpec = await SpecializationRepository.findById(req.params.id);

        if (!existingSpec) {
            throw new BadRequestError('Specialization does not exist');
        }

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
        const existingSpec = await SpecializationRepository.findById(req.params.id);

        if (!existingSpec) {
            throw new BadRequestError('Specialization does not exist');
        }

        await SpecializationRepository.deleteSpecialization(req.params.id);
    }
}