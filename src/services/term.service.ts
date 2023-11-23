import { Request } from "express";
import { DoctorRepository } from "../repositories/doctor.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { PatientRepository } from "../repositories/patient.repository";
import { PricelistRepository } from "../repositories/pricelist.repository";
import { CreateOrUpdateTerm, FilterParams } from "../interfaces/term.interface";
import { TermRepository } from "../repositories/term.repository";
import moment from "moment";

export class TermService {
    static async createTerm(req: Request) {
        const doctorExists = await DoctorRepository.findDoctorById(req.body.doctor);

        if (!doctorExists) {
            throw new BadRequestError('Doctor does not exist');
        }

        const patientExists = await PatientRepository.getPatientById(req.body.patient);

        if (!patientExists) {
            throw new BadRequestError('Patient does not exist');
        }

        const pricelistExists = await PricelistRepository.getPricelistById(req.body.pricelist);

        if (!pricelistExists) {
            throw new BadRequestError('Pricelist item does not exist');
        }

        const currentDate = new Date();

        if (req.body.time < currentDate) {
            throw new BadRequestError('Invalid date. Please choose a date in the future.');
        }

        const isWorkingHours = req.body.time.isBetween(moment('08:00', 'HH:mm'), moment('21:00', 'HH:mm'), 'minutes', '[]');

        if (!isWorkingHours) {
            throw new BadRequestError('Doctor works between 08:00 and 21:00. Please choose a valid time.');
        }

        const startDateTime = new Date(req.body.time);
        const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

        const existingTerm = await TermRepository.findTermByDoctorDateTime(req.body.doctor, startDateTime, endDateTime);

        if (existingTerm) {
            throw new BadRequestError('Doctor already has an appointment at the specified time.');
        }

        const termData: CreateOrUpdateTerm = {
            doctor: req.body.doctor,
            patient: req.body.patient,
            pricelistItem: req.body.pricelist,
            time: req.body.time
        };

        const term = await TermRepository.createTerm(termData);

        return term;
    }

    static async getFilteredTerms(req: Request) {
        
        const filterParams: FilterParams = {};

        if (req.query.doctor) {
            filterParams.doctor = req.query.doctor as string;
        }

        if (req.query.patient) {
            filterParams.patient = req.query.patient as string;
        }

        if (req.query.pricelist) {
            filterParams.pricelist = req.query.pricelist as string;
        }

        if (req.query.date) {
            const fullDate = new Date(req.query.date as string); 
            const formattedDate = new Date(fullDate.toISOString().split('T')[0]); 

            filterParams.date = formattedDate;
        }

        const terms = await TermRepository.getFilteredTerms(filterParams);

        return terms;
    }
}