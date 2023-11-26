import { Appointment } from "../models/appointment.model";
import { CreateOrUpdateAppointment, FilterParams } from "../interfaces/appointment.interface";

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

    static async getFilteredAppointments(filters: FilterParams) {
        return await Appointment.find(filters);
    }

    static async updateAppointment(id: string, appointment: CreateOrUpdateAppointment) {
        return await Appointment.findByIdAndUpdate(id, appointment, { new: true });
    }

    static async updateStatus(id: string, status: string) {
        return await Appointment.findByIdAndUpdate(id, { $set: { status } }, { new: true });
    }
}