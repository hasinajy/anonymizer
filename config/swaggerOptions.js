const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Anonymizer API Documentation",
            version: "1.0.0",
            description:
                "This is an API documentation example for Anonymizer usage",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);
