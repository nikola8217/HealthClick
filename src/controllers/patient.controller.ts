import { Request, Response, NextFunction } from "express";
import { PatientService } from "../services/patient.service";
import { PatientRepository } from "../repositories/patient.repository";

export class PatientController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientService.createPatient(req);

            res.status(201).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response) {
        const patients = await PatientRepository.getAllPatients();

        res.status(200).json(patients);
    }

    static async getSingle(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientService.findPatientByID(req);

            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientService.updatePatient(req);

            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await PatientService.deletePatient(req);

            res.status(200).json({ message: 'Patient is deleted' });
        } catch (error) {
            next(error);
        }
    }
}