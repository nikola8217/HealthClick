import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
    if (!token || !token.startsWith("Bearer ")) {
        throw new NotAuthorizedError();
    }

    next();
}