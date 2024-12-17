import mongoose from "mongoose";

export const connectDB = () => {
    const url = process.env.DATABASE_URL || " ";
    mongoose.connect(url)
        .then(() => console.log('Database is connected'))
        .catch(() => console.error("Error"));
}
