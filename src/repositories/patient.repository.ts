import { CreateOrUpdatePatient } from "../interfaces/patient.interface";
import { Patient } from "../models/patient.model";

export class PatientRepository {
    static async createPatient(patient: CreateOrUpdatePatient) {
        return await Patient.create(patient);
    }

    static async getAllPatients() {
        return await Patient.find({});
    }

    static async getPatientById(id: string) {
        return await Patient.findById(id);
    }

    static async updatePatient(id: string, patient: CreateOrUpdatePatient) {
        return await Patient.findByIdAndUpdate(id, patient, { new: true });
    }

    static async deletePatient(id: string) {
        return await Patient.findByIdAndDelete(id);
    }
}