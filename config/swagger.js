const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Food App API",
            version: "1.0.0",
            description: "Food Delivery Backend APIs"
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
            {
                url: "https://unarmored-dropper-blatantly.ngrok-free.dev"
            }
        ]
    },
    apis: ["./routes/*.js"] // routes se docs generate honge
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;