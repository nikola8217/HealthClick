import { Request } from "express";
import { CreateOrUpdatePricelist } from "../interfaces/pricelist.interface";
import { PricelistRepository } from "../repositories/pricelist.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { isValidObjectId } from "mongoose";

export class PricelistService {
    static async createPricelist(req: Request) {
        const existingPricelist = await PricelistRepository.findByName(req.body.name);

        if (existingPricelist) {
            throw new BadRequestError('Pricelist already exists');
        }

        const pricelistData: CreateOrUpdatePricelist = {
            name: req.body.name,
            price: req.body.price
        };

        const pricelist = await PricelistRepository.createPricelist(pricelistData);

        return pricelist;
    }

    static async findPricelistByID(req: Request) {
        const pricelist = this.checkPricelist(req.params.id);

        return pricelist;
    }

    static async updatePricelist(req: Request) {
        this.checkPricelist(req.params.id);

        const nameTaken = await PricelistRepository.findOtherByName(req.params.id, req.body.name);

        if (nameTaken) {
            throw new BadRequestError('Pricelist already exists');
        }

        const pricelistData: CreateOrUpdatePricelist = {
            name: req.body.name,
            price: req.body.price
        };

        const pricelist = await PricelistRepository.updatePricelist(req.params.id, pricelistData);

        return pricelist;
    }

    static async deletePricelist(req: Request) {
        this.checkPricelist(req.params.id);

        await PricelistRepository.deletePricelist(req.params.id);
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
}