import mongoose from "mongoose";

interface Specialization extends mongoose.Document {
    name: string
};

const specializationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Specialization = mongoose.model<Specialization>('Specialization', specializationSchema);

export { Specialization };