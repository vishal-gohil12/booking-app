import mongoose from "mongoose";
import { connectDB } from "./db";

connectDB();
const tourPackage = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    availableDates: {
        type: Date,
        require: true
    },
    images: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

export const Packages = mongoose.models.Packages || mongoose.model('Packages', tourPackage);
