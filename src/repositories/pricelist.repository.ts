import { CreateOrUpdatePricelist } from "../interfaces/pricelist.interface";
import { Pricelist } from "../models/pricelist.model";

export class PricelistRepository {
    static async createPricelistItem(pricelist: CreateOrUpdatePricelist) {
        return await Pricelist.create(pricelist);
    }

    static async findByName(name: string) {
        return await Pricelist.findOne({ name });
    }

    static async getAllPricelistItems() {
        return await Pricelist.find({});
    }

    static async getPricelistItemById(id: string) {
        return await Pricelist.findById(id);
    }

    static async updatePricelistItem(id: string, pricelist: CreateOrUpdatePricelist) {
        return await Pricelist.findByIdAndUpdate(id, pricelist, { new: true });
    }

    static async deletePricelistItem(id: string) {
        return await Pricelist.findByIdAndDelete(id);
    }

    static async findOtherByName(id: string, name: string) {
        return await Pricelist.findOne({ name, _id: { $ne: id } });
    }
}