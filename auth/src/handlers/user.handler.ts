import { Request } from 'express';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { CreateUser } from '../interfaces/user.interface';
import { BadRequestError } from '@healthclickapp/shared';
import jwt from 'jsonwebtoken';

export class UserHandler {

    static async registerUser(req: Request) {

        const existingUser = await UserRepository.findByEmail(req.body.email);

        if (existingUser) {
            throw new BadRequestError('Email is taken');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData: CreateUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        const user = await UserRepository.createUser(userData);

        return user;
    }

    static async loginUser(req: Request) {

        const existingUser = await UserRepository.findByEmail(req.body.email);

        if (!existingUser) {
            throw new BadRequestError('Invalid credentionals');
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);

        if (!isPasswordValid) {
            throw new BadRequestError('Invalid credentials');
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT must be defined');
        }

        const userJwt = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email
            },
            secret,
            { expiresIn: '1d' } 
        );

        return userJwt;
    }
}