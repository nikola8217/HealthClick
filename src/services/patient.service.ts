import { Request } from "express";
import { CreateOrUpdatePatient } from "../interfaces/patient.interface";
import { PatientRepository } from "../repositories/patient.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { isValidObjectId } from "mongoose";

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
        const patient = this.checkPatient(req.params.id);

        return patient;
    }

    static async updatePatient(req: Request) {
        this.checkPatient(req.params.id);

        const patientData: CreateOrUpdatePatient = {
            name: req.body.name,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth
        };

        const patient = await PatientRepository.updatePatient(req.params.id, patientData);

        return patient;
    }

    static async deletePatient(req: Request) {
        this.checkPatient(req.params.id);

        await PatientRepository.deletePatient(req.params.id);
    }

    private static async checkPatient(patient: string) {
        if (!isValidObjectId(patient)) {
            throw new BadRequestError('Patient does not exist')
        }

        const patientExists = await PatientRepository.getPatientById(patient);

        if (!patientExists) {
            throw new BadRequestError('Patient does not exist');
        }

        return patientExists;
    }
}