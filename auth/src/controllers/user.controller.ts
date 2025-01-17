import { NextFunction, Request, Response } from "express";
import { UserHandler } from "../handlers/user.handler";

export class UserController {
    
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserHandler.registerUser(req);

            res.status(201).json(user);
        } catch (error) {
            return next(error); 
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {

        try {
            const token = await UserHandler.loginUser(req);

            res.status(200).json({"token": token});
        } catch (error) {
            return next(error);
        }
    }

    static async logout(req: Request, res: Response) {
        req.session = null;

        res.send({});
    }
}