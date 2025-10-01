import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.error(`Error connecting to MongoDB: ${e.message}`);
        process.exit(1); // process code 1 means exiting with failure, 0 means success
    }
};