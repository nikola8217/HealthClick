import mongoose from 'mongoose';

interface Doctor extends mongoose.Document {
    name: string;
    education: string;
    yearsOfExpirience: number;
    yearOfEmployment: number;
    specialization: string;
}

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    yearsOfExpirience: {
        type: Number,
        required: true
    },
    yearOfEmployment: {
        type: Number,
        required: true
    },
    specialization: {
        type: String,
        require: true
    },
});

const Doctor = mongoose.model<Doctor>('Doctor', doctorSchema);

export { Doctor };