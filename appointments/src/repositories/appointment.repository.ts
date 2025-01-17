import { Appointment } from "../models/appointment.model";
import { CreateOrUpdateAppointment } from "../interfaces/appoinment.interface";

export class AppointmentRepository {
    static async createAppointment(appointment: CreateOrUpdateAppointment) {
        return await Appointment.create(appointment);
    }

    static async getAppointmentById(id: string) {
        return await Appointment.findById(id);
    }

    static async findAppointmentByDoctorDateTime(doctor: string, startDateTime: Date, endDateTime: Date) {
        return await Appointment.findOne({ doctor, time: { $gte: startDateTime, $lt: endDateTime }});
    }

    static async getAllAppointments() {
        return await Appointment.find({});
    }

    static async updateAppointment(id: string, appointment: CreateOrUpdateAppointment) {
        return await Appointment.findByIdAndUpdate(id, appointment, { new: true });
    }

    static async updateStatus(id: string, status: string) {
        return await Appointment.findByIdAndUpdate(id, { $set: { status } }, { new: true });
    }

    static async deleteAppointment(id: string) {
        return await Appointment.findByIdAndDelete(id);
    }

    static async deleteAppointmentsByPatient(patient: string) {
        return await Appointment.deleteMany({ patient });
    }

    static async deleteAppointmentByDoctor(doctor: string) {
        return await Appointment.deleteMany({ doctor });
    }

    static async getAppointmentsByPatient(patient: string) {
        return await Appointment.find({ patient });
    }

    static async getAppointmentsByDoctor(doctor: string) {
        return await Appointment.find({ doctor });
    }
}