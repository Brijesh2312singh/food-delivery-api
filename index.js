const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const app = express();

app.use(express.json());

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
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// API Routes (Clean Structure)
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Health Check
app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

// DB Connect
connectDB();


// 🔥 AUTO FIX: REMOVE OLD EMAIL UNIQUE INDEX (IMPORTANT)
mongoose.connection.once("open", async () => {
    try {
        await mongoose.connection.db.collection("users").dropIndex("email_1");
        console.log("✅ email_1 index removed successfully");
    } catch (err) {
        console.log("ℹ️ email_1 index already removed or not found");
    }
});


// Server Start
app.listen(process.env.PORT, () => {
    console.log("Server Running on Port " + process.env.PORT);
});