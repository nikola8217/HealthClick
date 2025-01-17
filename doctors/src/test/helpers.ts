import request from "supertest";
import { app } from "../app";

export const createDoctor = (name: string, education: string, yearsOfExpirience: number | string, yearOfEmployment: number | string, specialization: string, auth: boolean) => {
    if (!auth) {
        return request(app).post('/api/doctors').send({});
    }

    return request(app)
        .post('/api/doctors')
        .set('Authorization', global.signin())
        .send({
            name,
            education,
            yearsOfExpirience,
            yearOfEmployment,
            specialization
        });
};

export const getAllDoctors = (auth: boolean) => {
    if(!auth) {
        return request(app).get('/api/doctors');
    }

    return request(app).get('/api/doctors').set('Authorization', global.signin());
};

export const getByIDDoctor = (id: string, auth: boolean) => {
    if(!auth) {
        return request(app).get(`/api/doctors/${id}`);
    }

    return request(app).get(`/api/doctors/${id}`).set('Authorization', global.signin());
};

export const updateDoctor = (id: string, name: string, education: string, yearsOfExpirience: number | string, yearOfEmployment: number | string, specialization: string, auth: boolean) => {
    if (!auth) {
        return request(app).put(`/api/doctors/${id}`).send({});
    }

    return request(app)
        .put(`/api/doctors/${id}`)
        .set('Authorization', global.signin())
        .send({
            name,
            education,
            yearsOfExpirience,
            yearOfEmployment,
            specialization
        });
};

export const deleteDoctor = (id: string, auth: boolean) => {
    if(!auth) {
        return request(app).delete(`/api/doctors/${id}`);
    }

    return request(app).delete(`/api/doctors/${id}`).set('Authorization', global.signin());
};