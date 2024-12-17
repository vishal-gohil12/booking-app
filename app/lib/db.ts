import mongoose from "mongoose";

export const connectDB = () => {
    const url = process.env.DATABASE_URL || " ";
    mongoose.connect(url)
        .then(e => console.log('Database is connected'))
        .catch(e => console.error(e));
}
