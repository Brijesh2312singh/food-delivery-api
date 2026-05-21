const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// ======================
// CORS CONFIG (FIXED)
// ======================
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ======================
// PRE-FLIGHT FIX (IMPORTANT FOR SWAGGER)
// ======================
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// ======================
// Middleware
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Routes
// ======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/otp", require("./routes/otpRoutes"));
app.use("/api/home", require("./routes/homeRoutes"));
app.use("/api/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

// ======================
// Swagger
// ======================
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// HEALTH CHECK
// ======================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Running 🚀"
    });
});

// ======================
// START SERVER
// ======================
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log("🚀 Server Running on Port " + PORT);
            console.log("📄 Swagger Docs: /api-docs");
        });

    } catch (err) {
        console.log("❌ Server Error:", err.message);
        process.exit(1);
    }
};

startServer();