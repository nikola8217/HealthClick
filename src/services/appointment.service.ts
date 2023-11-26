import { Request } from "express";
import { DoctorRepository } from "../repositories/doctor.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { PatientRepository } from "../repositories/patient.repository";
import { PricelistRepository } from "../repositories/pricelist.repository";
import { CreateOrUpdateAppointment, FilterParams } from "../interfaces/appointment.interface";
import { AppointmentRepository } from "../repositories/appointment.repository";
import moment from "moment";
import { isValidObjectId } from "mongoose";

export class AppointmentService {
    static async createAppointment(req: Request) {
        this.checkDoctor(req.body.doctor);

        this.checkPatient(req.body.patien);

        this.checkPricelist(req.body.pricelist);

        this.checkAppointmentTime(req.body.time, req.body.doctor);

        const appointmentData: CreateOrUpdateAppointment = {
            doctor: req.body.doctor,
            patient: req.body.patient,
            pricelistItem: req.body.pricelist,
            time: req.body.time
        };

        const appointment = await AppointmentRepository.createAppointment(appointmentData);

        return appointment;
    }

    static async getAppointmentById(req: Request) {
        const appointment = this.checkAppointment(req.params.id);

        return appointment;

    }

    static async getFilteredAppointments(req: Request) {
        
        const filterParams: FilterParams = {};

        const setFilter = (param: string, key: keyof FilterParams, transform?: (value: string) => any) => {
            const value = req.query[param] as string | undefined;
            if (value) {
            filterParams[key] = transform ? transform(value) : value;
            }
        };

        setFilter('doctor', 'doctor');
        setFilter('patient', 'patient');
        setFilter('pricelist', 'pricelist');
        setFilter('date', 'date', (value) => {
            const fullDate = new Date(value);
            return new Date(fullDate.toISOString().split('T')[0]);
        });

        const appointments = await AppointmentRepository.getFilteredAppointments(filterParams);
        
        return appointments;
    }

    static async updateAppointment(req: Request) {
        const appointment = await this.checkAppointment(req.params.id);

        if (req.body.doctor) this.checkDoctor(req.body.doctor);

        if (req.body.patien) this.checkPatient(req.body.patien);

        if (req.body.pricelist) this.checkPricelist(req.body.pricelist);

        if (req.body.time) this.checkAppointmentTime(req.body.time, req.body.doctor ? req.body.doctor : appointment.doctor);

        const allowedFields = ['doctor', 'patient', 'pricelist', 'time'];
        const appointmentData: CreateOrUpdateAppointment = {};

        for (const field of allowedFields) {
            if (req.body[field]) {
                appointmentData[field] = req.body[field];
            }
        }

        const appointmentUpd = await AppointmentRepository.updateAppointment(req.params.id, appointmentData);

        return appointmentUpd;
    }

    static async updateStatus(req: Request) {
        await this.checkAppointment(req.params.id);

        const appointment = await AppointmentRepository.updateStatus(req.params.id, req.body.status);

        return appointment;
    }

    private static async checkAppointment(appointment: string) {
        if (!isValidObjectId(appointment)) {
            throw new BadRequestError('Appointment does not exist')
        }

        const appointmentExists = await AppointmentRepository.getAppointmentById(appointment);

        if (!appointmentExists) {
            throw new BadRequestError('Appointment does not exist');
        }

        return appointmentExists;
    }

    private static async checkDoctor(doctor: string) {
        if (!isValidObjectId(doctor)) {
            throw new BadRequestError('Doctor does not exist')
        }

        const doctorExists = await DoctorRepository.getDoctorById(doctor);

        if (!doctorExists) {
            throw new BadRequestError('Doctor does not exist');
        }

        return doctorExists;
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

    private static async checkPricelist(pricelist: string) {
        if (!isValidObjectId(pricelist)) {
            throw new BadRequestError('Pricelist does not exist')
        }

        const pricelistExists = await PricelistRepository.getPricelistById(pricelist);

        if (!pricelistExists) {
            throw new BadRequestError('Pricelist does not exist');
        }

        return pricelistExists;
    }

    private static async checkAppointmentTime(time: Date, doctor: string) {
        this.checkIsFutureDate(time);

        this.checkIsWorkingHours(time);

        this.checkIfDoctorHasAppointent(time, doctor)
    }

    private static async checkIsFutureDate(time: Date) {
        const currentDate = new Date();

        if (time < currentDate) {
            throw new BadRequestError('Invalid date. Please choose a date in the future.');
        }
    }

    private static async checkIsWorkingHours(time: Date) {
        const isWorkingHours = moment(time).isBetween(moment('08:00', 'HH:mm'), moment('21:00', 'HH:mm'), 'minutes', '[]');

        if (!isWorkingHours) {
            throw new BadRequestError('Doctor works between 08:00 and 21:00. Please choose a valid time.');
        }
    }

    private static async checkIfDoctorHasAppointent(time: Date, doctor: string) {
        const startDateTime = new Date(time);
        const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

        const existingAppointment = await AppointmentRepository.findAppointmentByDoctorDateTime(doctor, startDateTime, endDateTime);

        if (existingAppointment) {
            throw new BadRequestError('Doctor already has an appointment at the specified time.');
        }
    }
}