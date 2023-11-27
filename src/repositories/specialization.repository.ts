import { Specialization } from "../models/specialization.model";
import { CreateOrUpdateSpecialization } from "../interfaces/specialization.interface";

export class SpecializationRepository {
    static async createSpecialization(specialization: CreateOrUpdateSpecialization) {
        return await Specialization.create(specialization);
    }

    static async findByName(name: string) {
        return await Specialization.findOne({ name });
    }

    static async getAllSpecialization() {
        return await Specialization.find({});
    }

    static async getSpecializationById(id: string) {
        return await Specialization.findById(id);
    }

    static async updateSpecialization(id: string, specialization: CreateOrUpdateSpecialization) {
        return await Specialization.findByIdAndUpdate(id, specialization, { new: true });
    }

    static async deleteSpecialization(id: string) {
        return await Specialization.findByIdAndDelete(id);
    }

    static async findOtherByName(id: string, name: string) {
        return await Specialization.findOne({ name, _id: { $ne: id } });
    }
}