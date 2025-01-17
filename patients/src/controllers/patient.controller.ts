import { Request, Response, NextFunction } from "express";
import { PatientHandler } from "../handlers/patient.handler";
import { PatientRepository } from "../repositories/patient.repository";

export class PatientController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientHandler.createPatient(req);

            res.status(201).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientRepository.getAllPatients();

            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async getByID(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientHandler.findPatientByID(req);

            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientHandler.updatePatient(req);

            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await PatientHandler.deletePatient(req);

            res.status(200).json({ message: 'Patient is deleted' });
        } catch (error) {
            next(error);
        }
    }
}