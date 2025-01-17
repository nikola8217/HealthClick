import { Request, Response, NextFunction } from "express";
import { AppointmentHandler } from "../handlers/appointment.handler";

export class AppointmentController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const appointment = await AppointmentHandler.createAppointment(req);

            res.status(201).json(appointment);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const appointments = await AppointmentHandler.getAllAppointments(req);

            res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    }

    static async getbyID(req: Request, res: Response, next: NextFunction) {
        try {
            const appointment = await AppointmentHandler.getAppoinmentByID(req);

            res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const appointment = await AppointmentHandler.updateAppointment(req);

            res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await AppointmentHandler.deleteAppointment(req);

            res.status(200).json({ message: 'Appointment is deleted' });
        } catch (error) {
            next(error);
        }
    }

    static async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            AppointmentHandler.updateStatus(req);

            res.status(200).json({ message: "Status updated" });
        } catch (error) {
            next(error);
        }
    }

    static async deleteByPatient(req: Request, res: Response, next: NextFunction) {
        try {
            AppointmentHandler.deleteAppointmentByPatient(req);

            res.status(200).json({ message: "Appointments are successfully deleted" })
        } catch (error) {
            next(error);    
        }
    }

    static async deleteByDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            AppointmentHandler.deleteAppointmentByDoctor(req);

            res.status(200).json({ message: "Appointments are successfully deleted" })
        } catch (error) {
            next(error);    
        }
    }
}