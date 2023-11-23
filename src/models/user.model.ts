import mongoose from "mongoose";

interface User extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        }
    }
});

const User = mongoose.model<User>('User', userSchema);

export { User };