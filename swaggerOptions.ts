import path from "path";

export const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "The movie DB API",
            version: "1.0.0",
            description: "Une api pour récupérer les données de The movie DB",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "server local",
            },
        ],
    }, 
    apis: [path.resolve(__dirname, "./controllers/*.ts")],
}