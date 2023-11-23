import mongoose from 'mongoose';

interface Patient extends mongoose.Document {
    name: string,
    address: string,
    dateOfBirth: Date
}

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
});

const Patient = mongoose.model<Patient>('Patient', patientSchema);

export { Patient };