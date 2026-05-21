const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const homeRoutes = require("./routes/homeRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const searchRoutes = require("./routes/searchRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// ======================
// Middleware
// ======================
app.use(express.json());

// ======================
// Swagger Docs
// ======================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// API Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// ======================
// Health Check
// ======================
app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

// ======================
// Global Error Handler
// ======================
app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ======================
// DB Connection + Server Start
// ======================
const startServer = async () => {
    try {
        await connectDB();

        // Server start only after DB connected
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log("🚀 Server Running on Port " + PORT);
            console.log("📄 Swagger Docs: /api-docs");
        });

        // Optional: safe index handling (run once only)
        mongoose.connection.once("open", async () => {
            try {
                const indexes = await mongoose.connection.db.collection("users").indexes();
                const emailIndex = indexes.find(i => i.name === "email_1");

                if (emailIndex) {
                    await mongoose.connection.db.collection("users").dropIndex("email_1");
                    console.log("✅ email_1 index removed successfully");
                } else {
                    console.log("ℹ️ email_1 index not found");
                }
            } catch (err) {
                console.log("⚠️ Index handling error:", err.message);
            }
        });

    } catch (error) {
        console.error("❌ DB Connection Failed:", error.message);
        process.exit(1);
    }
};

startServer();