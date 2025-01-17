import request from "supertest";
import { app } from "../app";
import { CreateUser } from "../interfaces/user.interface";

export const registerUser = (user: CreateUser) => {
    return request(app)
        .post('/api/users/register')
        .send({
            name: user.name,
            email: user.email,
            password: user.password
        });
}

export const loginUser = (email: string, password: string) => {
    return request(app)
        .post('/api/users/login')
        .send( {email, password });
}