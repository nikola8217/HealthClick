import mongoose, { mongo } from 'mongoose';

export const connectDB = (url: string) => {
    return mongoose.connect(url);
}