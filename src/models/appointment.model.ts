import mongoose from "mongoose";

interface Appointment extends mongoose.Document {
    patient: string,
    doctor: string,
    pricelistItem: string,
    time: Date,
    status: string
};

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    pricelistItem: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Pricelist'
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

