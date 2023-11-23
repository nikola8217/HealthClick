import { Term } from "../models/term.model";
import { CreateOrUpdateTerm, FilterParams } from "../interfaces/term.interface";

export class TermRepository {
    static async createTerm(term: CreateOrUpdateTerm) {
        return Term.create(term);
    }

    static async findTermByDoctorDateTime(doctor: string, startDateTime: Date, endDateTime: Date) {
        return await Term.findOne({ doctor, time: { $gte: startDateTime, $lt: endDateTime }});
    }

    static async getFilteredTerms(filters: FilterParams) {
        return await Term.find(filters);
    }

    static async getTermById (id: string, term: CreateOrUpdateTerm) {
        return Term.findByIdAndUpdate(id, term, { new: true });
    }
}