import { Request } from "express";
import { SpecializationRepository } from '../repositories/specialization.repository';
import { BadRequestError } from "@healthclickapp/shared";
import { CreateOrUpdateSpecialization } from "../interfaces/specialization.interface";
import { isValidObjectId } from "mongoose";
import { DoctorHandler } from "./doctor.handler";

export class SpecializationHandler {
    private static async getToken(req: Request) : Promise<string> {
        return req.headers.authorization || '';
    }

    static async createSpecialization(req: Request) {
        const existingSpec = await SpecializationRepository.findByName(req.body.name);

        if (existingSpec) {
            throw new BadRequestError('Specialization already exists');
        }

        const specializationData = await this.prepareSpecializationData(req);

        const specialization = await SpecializationRepository.createSpecialization(specializationData);

        return specialization;
    }

    private static async prepareSpecializationData(req: Request) {
        const data: CreateOrUpdateSpecialization = {
            name: req.body.name
        };
        
        return data;
    }

    static async getSpecializationByID(req: Request) {
        const specialization = await this.checkSpecialization(req.params.id);

        return specialization;
    }

    static async updateSpecialization(req: Request) {
        await this.checkSpecialization(req.params.id);

        const nameTaken = await SpecializationRepository.findOtherByName(req.params.id, req.body.name);

        if (nameTaken) {
            throw new BadRequestError('Specialization already exists');
        }

        const specializationData = await this.prepareSpecializationData(req);

        const specialization = await SpecializationRepository.updateSpecialization(req.params.id, specializationData);

        return specialization;
    }

    static async deleteSpecialization(req: Request) {
        const cookie = await this.getToken(req);

        await this.checkSpecialization(req.params.id);

        await DoctorHandler.deleteDoctors(cookie, req.params.id);

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