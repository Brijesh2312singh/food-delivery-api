const swaggerJsDoc = require("swagger-jsdoc");

const isProduction = process.env.NODE_ENV === "production";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Food App API",
            version: "1.0.0",
            description: "Food Delivery Backend APIs"
        },

        // 🔥 Dynamic server selection (DEV + PROD)
        servers: isProduction
            ? [
                {
                    url: "https://foodappapi.onrender.com",
                    description: "Production Server"
                }
            ]
            : [
                {
                    url: "http://localhost:3000",
                    description: "Local Server"
                },
                {
                    url: "https://your-ngrok-url.ngrok-free.app",
                    description: "Ngrok Dev Server"
                }
            ]
    },

    // routes se swagger docs generate honge
    apis: ["./routes/*.js"]
};

module.exports = swaggerJsDoc(options);