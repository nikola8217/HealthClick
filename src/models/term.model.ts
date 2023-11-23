import mongoose from "mongoose";

interface Term extends mongoose.Document {
    patient: string,
    doctor: string,
    pricelistItem: string,
    time: Date,
    status: string
};

const termSchema = new mongoose.Schema({
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
    dateOfBirth: {
        type: Date,
        required: true
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

const Term = mongoose.model<Term>('Term', termSchema);

export { Term };

