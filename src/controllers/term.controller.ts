import { Request, Response, NextFunction } from "express";
import { TermService } from "../services/term.service";

export class TermController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const term = TermService.createTerm(req);

            res.status(201).json(term);
        } catch (error) {
            next(error);
        }
    }
}