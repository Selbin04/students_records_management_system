import mongoose from "mongoose";
import 'dotenv/config';

let connectionPromise;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set");
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGO_URI);
    }

    try {
        await connectionPromise;
        console.log("Database connected successfully");
        return mongoose.connection;
    } catch (error) {
        connectionPromise = null;
        console.log("Database connection failed", error);
        throw error;
    }
};

export default connectDB;
