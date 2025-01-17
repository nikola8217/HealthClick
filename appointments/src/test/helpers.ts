import request from "supertest";
import { app } from "../app";

export const createAppointment = (patient: string, doctor: string, time: Date, auth: boolean) => {
    if (!auth) {
        return request(app).post('/api/appointments').send({});
    }

    return request(app)
        .post('/api/appointments')
        .set('Authorization', global.signin())
        .send({
            patient,
            doctor,
            time
        });
};

export const getAllAppointments = (auth: boolean) => {
    if(!auth) {
        return request(app).get('/api/appointments');
    }

    return request(app).get('/api/appointments').set('Authorization', global.signin());
};

export const getByIDAppointment = (id: string, auth: boolean) => {
    if(!auth) {
        return request(app).get(`/api/appointments/${id}`);
    }

    return request(app).get(`/api/appointments/${id}`).set('Authorization', global.signin());
};

export const updateAppointment = (id: string, patient: string, doctor: string, time: Date, auth: boolean) => {
    if (!auth) {
        return request(app).put(`/api/appointments/${id}`).send({});
    }

    return request(app)
        .put(`/api/appointments/${id}`)
        .set('Authorization', global.signin())
        .send({
            patient,
            doctor,
            time
        });
};

export const deleteAppointment = (id: string, auth: boolean) => {
    if(!auth) {
        return request(app).delete(`/api/appointments/${id}`);
    }

    return request(app).delete(`/api/appointments/${id}`).set('Authorization', global.signin());
};

export const updateAppointmentStatus = (id: string, status: string, auth: boolean) => {
    if (!auth) {
        return request(app).patch(`/api/appointments/updateStatus/${id}`).send({});
    }

    return request(app)
        .patch(`/api/appointments/updateStatus/${id}`)
        .set('Authorization', global.signin())
        .send({
            status
        });
};