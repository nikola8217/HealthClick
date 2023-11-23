import mongoose from "mongoose";

interface Pricelist extends mongoose.Document {
    name: string,
    price: number
}

const pricelistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const Pricelist = mongoose.model<Pricelist>('Pricelist', pricelistSchema);

export { Pricelist };