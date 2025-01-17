import request from 'supertest';
import { app } from '../app';

export const createSpecialization = (name: string, auth: boolean) => {
    if (!auth) {
        return request(app).post('/api/specializations').send({ name });
    }

    return request(app).post('/api/specializations').set('Authorization', global.signin()).send({ name });
};

export const getAllSpecializations = (auth: boolean) => {
    if (!auth) {
        return request(app).get('/api/specializations');
    }

    return request(app).get('/api/specializations').set('Authorization', global.signin());
};

export const getByIDSpecialization = (id: string, auth: boolean) => {
    if (!auth) {
        return request(app).get(`/api/specializations/${id}`);
    }

    return request(app).get(`/api/specializations/${id}`).set('Authorization', global.signin())
};

export const updateSpecialization = (id: string, name: string, auth: boolean) => {
    if (!auth) {
        return request(app).put(`/api/specializations/${id}`).send({ name });
    }

    return request(app).put(`/api/specializations/${id}`).set('Authorization', global.signin()).send({ name });
};

export const deleteSpecialization = (id: string, auth: boolean) => {
    if (!auth) {
        return request(app).delete(`/api/specializations/${id}`);
    }

    return request(app).delete(`/api/specializations/${id}`).set('Authorization', global.signin());
};