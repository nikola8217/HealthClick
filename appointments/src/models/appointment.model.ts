import mongoose from "mongoose";

interface Appointment extends mongoose.Document {
    patient: string,
    doctor: string,
    time: Date,
    status: string
};

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: String,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'canceled', 'fulfilled'], 
        default: 'pending' 
    }
});

const Appointment = mongoose.model<Appointment>('Appointment', appointmentSchema);

export { Appointment };

