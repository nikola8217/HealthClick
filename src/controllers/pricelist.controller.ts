import { Request, Response, NextFunction } from "express";
import { PricelistService } from "../services/pricelist.service";
import { PricelistRepository } from "../repositories/pricelist.repository";

export class PricelistController {
    static async createPricelistItem(req: Request, res: Response, next: NextFunction) {
        try {
            const pricelist = await PricelistService.createPricelistItem(req);

            res.status(201).json(pricelist);
        } catch (error) {
            next(error);
        }
    }

    static async getPricelistItems(req: Request, res: Response) {
        const pricelists = await PricelistRepository.getAllPricelistItems();

        res.status(200).json(pricelists);
    }

    static async getSinglePricelistItem(req: Request, res: Response, next: NextFunction) {
        try {
            const pricelist = await PricelistService.findPricelistItemByID(req);

            res.status(200).json(pricelist);
        } catch (error) {
            next(error);
        }
    }

    static async updatePricelistItem(req: Request, res: Response, next: NextFunction) {
        try {
            const pricelist = await PricelistService.updatePricelistItem(req);

            res.status(200).json(pricelist);
        } catch (error) {
            next(error);
        }
    }

    static async deletePricelistItem(req: Request, res: Response, next: NextFunction) {
        try {
            await PricelistService.deletePricelistItem(req);

            res.status(200).json({ message: 'Pricelist is deleted' });
        } catch (error) {
            next(error);
        }
    }
}