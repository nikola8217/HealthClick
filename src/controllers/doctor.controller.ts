import { Request, Response, NextFunction } from "express";
import { DoctorService } from "../services/doctor.service";
import { DoctorRepository } from "../repositories/doctor.repository";

export class DoctorController {
    static async createDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const doctor = await DoctorService.createDoctor(req);

            res.status(201).json(doctor);
        } catch (error) {
            next(error);
        }
    }

    static async getDoctors(req: Request, res: Response) {
        const doctors = await DoctorRepository.getAllDoctors();

        res.status(200).json(doctors);
    }

    static async getSingleDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const doctor = await DoctorService.findDoctorByID(req);

            res.status(200).json(doctor);
        } catch (error) {
            next(error);
        }
    }

    static async updateDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const doctor = await DoctorService.updateDoctor(req);

            res.status(200).json(doctor);
        } catch (error) {
            next(error);
        }
    }

    static async deleteDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            await DoctorService.deleteDoctor(req);

            res.status(200).json({ message: 'Doctor is deleted' });
        } catch (error) {
            next(error);
        }
    }
}