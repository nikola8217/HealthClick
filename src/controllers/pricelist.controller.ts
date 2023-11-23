import { Request, Response, NextFunction } from "express";
import { PricelistService } from "../services/pricelist.service";
import { PricelistRepository } from "../repositories/pricelist.repository";

export class PricelistController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const pricelist = await PricelistService.createPricelist(req);

            res.status(201).json(pricelist);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response) {
        const pricelists = await PricelistRepository.getAllPricelists();

        res.status(200).json(pricelists);
    }

    static async getSingle(req: Request, res: Response, next: NextFunction) {
        try {
            const pricelist = await PricelistService.findPricelistByID(req);

            res.status(200).json(pricelist);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const pricelist = await PricelistService.updatePricelist(req);

            res.status(200).json(pricelist);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await PricelistService.deletePricelist(req);

            res.status(200).json({ message: 'Pricelist is deleted' });
        } catch (error) {
            next(error);
        }
    }
}