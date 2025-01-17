import { Request, Response, NextFunction } from "express";
import { DoctorHandler } from "../handlers/doctor.handler";
import { DoctorRepository } from "../repositories/doctor.repository";

export class DoctorController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const doctor = await DoctorHandler.createDoctor(req);

            res.status(201).json(doctor);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const doctors = await DoctorHandler.getAllDoctors(req);

            res.status(200).json(doctors);
        } catch (error) {
            next(error);
        }
    }

    static async getByID(req: Request, res: Response, next: NextFunction) {
        try {
            const doctor = await DoctorHandler.getDoctorByID(req);

            res.status(200).json(doctor);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const doctor = await DoctorHandler.updateDoctor(req);

            res.status(200).json(doctor);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await DoctorHandler.deleteDoctor(req);

            res.status(200).json({ message: 'Doctor is successfully deleted' });
        } catch (error) {
            next(error);
        }
    }

    static async getDoctorsBySpecialization(req: Request, res: Response, next: NextFunction) {
        try {
            const doctors = await DoctorRepository.getDoctorsBySpecialization(req.params.specializationId);

            res.status(200).json(doctors)
        } catch (error) {
            next(error);
        }
    }

    static async deleteBySpecialization(req: Request, res: Response, next: NextFunction) {
        try {
            await DoctorHandler.deleteDoctorBySpecialization(req);

            res.status(200).json({ message: 'Doctors are successfully deleted' });
        } catch (error) {
            next(error);
        }
    }
}