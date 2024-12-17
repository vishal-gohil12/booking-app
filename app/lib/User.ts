import mongoose, { Schema } from "mongoose";
import { connectDB } from "./db";

connectDB();
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    travelers: {
        type: Number,
        require: true
    },
    specialRequest: {
        type: String,
    },
    tour_id: {
        type: Schema.Types.ObjectId,
        ref: 'Packages',
        require: true
    }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
