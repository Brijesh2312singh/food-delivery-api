const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Food App API",
            version: "1.0.0",
            description: "Food Delivery Backend APIs"
        },

        // ======================
        // JWT AUTH ENABLE (IMPORTANT)
        // ======================
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        // Global security (optional but recommended)
        security: [
            {
                bearerAuth: []
            }
        ],

        // ======================
        // SERVERS (LOCAL + NGROK)
        // ======================
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Server"
            },
            {
                url: "https://unarmored-dropper-blatantly.ngrok-free.dev",
                description: "Ngrok Server"
            }
        ]
    },

    // routes se Swagger docs generate honge
    apis: ["./routes/*.js"]
};

module.exports = swaggerJsDoc(options);