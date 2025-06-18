import mongoose from "mongoose";
import { MONGODB_URL } from "./serverConfig.js";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }    
};

export default connectDB;