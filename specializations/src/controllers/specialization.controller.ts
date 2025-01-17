import { Request, Response, NextFunction } from "express";
import { SpecializationHandler } from "../handlers/specialization.handler";
import { SpecializationRepository } from "../repositories/specialization.repository";

export class SpecializationController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const specialization = await SpecializationHandler.createSpecialization(req);

            res.status(201).json(specialization);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response) {
        const specializations = await SpecializationRepository.getAllSpecialization();

        res.status(200).json(specializations);
    }

    static async getByID(req: Request, res: Response, next: NextFunction) {
        try {
            const specialization = await SpecializationHandler.getSpecializationByID(req);

            res.status(200).json(specialization);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const specialization = await SpecializationHandler.updateSpecialization(req);

            res.status(200).json(specialization);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await SpecializationHandler.deleteSpecialization(req);
            
            res.status(200).json({msg: 'Specialization is deleted'});
        } catch (error) {
            next(error);
        }
    }
}