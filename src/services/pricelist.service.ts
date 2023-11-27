import { Request } from "express";
import { CreateOrUpdatePricelist } from "../interfaces/pricelist.interface";
import { PricelistRepository } from "../repositories/pricelist.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { isValidObjectId } from "mongoose";

export class PricelistService {
    static async createPricelistItem(req: Request) {
        const existingPricelist = await PricelistRepository.findByName(req.body.name);

        if (existingPricelist) {
            throw new BadRequestError('Pricelist already exists');
        }

        const pricelistData: CreateOrUpdatePricelist = {
            name: req.body.name,
            price: req.body.price
        };

        const pricelist = await PricelistRepository.createPricelistItem(pricelistData);

        return pricelist;
    }

    static async findPricelistItemByID(req: Request) {
        const pricelist = await this.checkPricelist(req.params.id);

        return pricelist;
    }

    static async updatePricelistItem(req: Request) {
        await this.checkPricelist(req.params.id);

        const nameTaken = await PricelistRepository.findOtherByName(req.params.id, req.body.name);

        if (nameTaken) {
            throw new BadRequestError('Pricelist already exists');
        }

        const allowedFields = ['name', 'price'];
        const pricelistData: CreateOrUpdatePricelist = {};

        for (const field of allowedFields) {
            if (req.body[field]) {
                pricelistData[field] = req.body[field];
            }
        }

        const pricelist = await PricelistRepository.updatePricelistItem(req.params.id, pricelistData);

        return pricelist;
    }

    static async deletePricelistItem(req: Request) {
        await this.checkPricelist(req.params.id);

        await PricelistRepository.deletePricelistItem(req.params.id);
    }

    private static async checkPricelist(pricelist: string) {
        if (!isValidObjectId(pricelist)) {
            throw new BadRequestError('Pricelist does not exist')
        }

        const pricelistExists = await PricelistRepository.getPricelistItemById(pricelist);

        if (!pricelistExists) {
            throw new BadRequestError('Pricelist does not exist');
        }

        return pricelistExists;
    }
}