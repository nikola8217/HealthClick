import { Doctor } from "../models/doctor.model";
import { CreateOrUpdateDoctor } from "../interfaces/doctor.interface";

export class DoctorRepository {
    static async createDoctor(doctor: CreateOrUpdateDoctor) {
        return await Doctor.create(doctor);
    }

    static async getAllDoctors() {
        return await Doctor.find({});
    }

    static async getDoctorById (id: string) {
        return await Doctor.findById(id);
    }

    static async updateDoctor(id: string, doctor: CreateOrUpdateDoctor) {
        return await Doctor.findByIdAndUpdate(id, doctor, { new: true });
    }

    static async deleteDoctor(id: string) {
        return await Doctor.findByIdAndDelete(id);
    }
}