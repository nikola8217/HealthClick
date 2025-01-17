import request from "supertest";
import { app } from "../app";
import { CreateOrUpdatePatient } from "../interfaces/patient.interface";

export const createPatient = (patient: CreateOrUpdatePatient, auth: boolean) => {
    if (!auth) {
        return request(app)
            .post('/api/patients')
            .send({});
    }

    return request(app)
        .post('/api/patients')
        .send({
            name: patient.name,
            address: patient.address,
            dateOfBirth: isNaN(patient.dateOfBirth.getTime()) 
                ? null 
                : patient.dateOfBirth.toISOString().split('T')[0]
        }).set('Authorization', global.signin());
}

export const getAllPatients = (auth: boolean) => {
    if (!auth) {
        return request(app).get('/api/patients');
    }

    return request(app).get('/api/patients').set('Authorization', global.signin());
};

export const getByIDPatient = (id: string, auth: boolean) => {
    if (!auth) {
        return request(app).get(`/api/patients/${id}`);
    }

    return request(app).get(`/api/patients/${id}`).set('Authorization', global.signin())
};

export const updatePatient = (id: string, patient: CreateOrUpdatePatient, auth: boolean) => {
    if (!auth) {
        return request(app)
            .put(`/api/patients/${id}`)
            .send({});
    }

    return request(app)
        .put(`/api/patients/${id}`)
        .send({
            name: patient.name,
            address: patient.address,
            dateOfBirth: isNaN(patient.dateOfBirth.getTime()) 
                ? null 
                : patient.dateOfBirth.toISOString().split('T')[0]
        }).set('Authorization', global.signin());
};

export const deletePatient = (id: string, auth: boolean) => {
    if (!auth) {
        return request(app).delete(`/api/patients/${id}`);
    }

    return request(app).delete(`/api/patients/${id}`).set('Authorization', global.signin());
};