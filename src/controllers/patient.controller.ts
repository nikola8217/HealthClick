import { Request, Response, NextFunction } from "express";
import { PatientService } from "../services/patient.service";
import { PatientRepository } from "../repositories/patient.repository";

export class PatientController {
    static async createPatient(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientService.createPatient(req);

            res.status(201).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async getPatients(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = PatientService.findPatientByID(req);

            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async getSinglePatient(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientService.findPatientByID(req);

            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async updatePatient(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientService.updatePatient(req);

            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    }

    static async deletePatient(req: Request, res: Response, next: NextFunction) {
        try {
            await PatientService.deletePatient(req);

            res.status(200).json({ message: 'Patient is deleted' });
        } catch (error) {
            next(error);
        }
    }
}