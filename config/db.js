const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const uri = process.env.MONGO_URI || process.env.MONGO_URL;

        if (!uri) {
            throw new Error("MongoDB URI missing in .env");
        }

        await mongoose.connect(uri);

        isConnected = true;
        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.log("DB Error ❌", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;