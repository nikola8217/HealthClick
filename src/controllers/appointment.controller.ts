import { Request, Response, NextFunction } from "express";
import { AppointmentService } from "../services/appointment.service";

export class AppointmentController {
    static async createAppointment(req: Request, res: Response, next: NextFunction) {
        try {
            const appointment = await AppointmentService.createAppointment(req);

            res.status(201).json(appointment);
        } catch (error) {
            next(error);
        }
    }

    static async getSingleAppointment(req: Request, res: Response, next: NextFunction) {
        try {
            const appointment = await AppointmentService.getAppointmentById(req);

            res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    }

    static async getAppointments(req: Request, res: Response, next: NextFunction) {
        try {
            const appointments = await AppointmentService.getFilteredAppointments(req);

            res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    }

    static async updateAppointment(req: Request, res: Response, next: NextFunction) {
        try {
            const appointment = await AppointmentService.updateAppointment(req);

            res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    }

    static async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const appointment = await AppointmentService.updateStatus(req);

            res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    }
}