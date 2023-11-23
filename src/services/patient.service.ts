import { Request } from "express";
import { CreateOrUpdatePatient } from "../interfaces/patient.interface";
import { PatientRepository } from "../repositories/patient.repository";
import { BadRequestError } from "../errors/bad-request-error";

export class PatientService {
    static async createPatient(req: Request) {
        const patientData: CreateOrUpdatePatient = {
            name: req.body.name,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth
        };

        const patient = await PatientRepository.createPatient(patientData);

        return patient;
    }

    static async findPatientByID(req: Request) {
        const patient = await PatientRepository.getPatientById(req.params.id);

        if (!patient) {
            throw new BadRequestError('Patient does not exist');
        }

        return patient;
    }

    static async updatePatient(req: Request) {
        const patientExists = await PatientRepository.getPatientById(req.params.id);

        if (!patientExists) {
            throw new BadRequestError('Patient does not exist');
        }

        const patientData: CreateOrUpdatePatient = {
            name: req.body.name,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth
        };

        const patient = await PatientRepository.updatePatient(req.params.id, patientData);

        return patient;
    }

    static async deletePatient(req: Request) {
        const patientExists = await PatientRepository.getPatientById(req.params.id);

        if (!patientExists) {
            throw new BadRequestError('Patient does not exist');
        }

        await PatientRepository.deletePatient(req.params.id);
    }
}