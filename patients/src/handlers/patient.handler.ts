import { Request } from "express";
import { CreateOrUpdatePatient } from "../interfaces/patient.interface";
import { PatientRepository } from "../repositories/patient.repository";
import { BadRequestError } from "@healthclickapp/shared";
import { isValidObjectId } from "mongoose";
import { AppointmentHandler } from "./appointment.handler";

export class PatientHandler {
    private static async getToken(req: Request) : Promise<string> {
        return req.headers.authorization || '';
    }

    static async createPatient(req: Request) {
        const patientData = await this.preparePatientData(req);

        const patient = await PatientRepository.createPatient(patientData);

        return patient;
    }

    private static async preparePatientData(req: Request) {
        const data: CreateOrUpdatePatient = {
            name: req.body.name,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth
        };

        return data;
    }

    static async findPatientByID(req: Request) {
        const patient = await this.checkPatient(req.params.id);

        return patient;
    }

    static async updatePatient(req: Request) {
        await this.checkPatient(req.params.id);

        const patientData = await this.preparePatientData(req);

        const patient = await PatientRepository.updatePatient(req.params.id, patientData);

        return patient;
    }

    static async deletePatient(req: Request) {
        const cookie = await this.getToken(req);
        
        await this.checkPatient(req.params.id);

        await AppointmentHandler.deleteAppointments(cookie, req.params.id);

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