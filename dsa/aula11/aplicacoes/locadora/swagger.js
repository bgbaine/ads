import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Locadora Avenida",
      version: "1.0.0",
      description: "Documentacao da API Locadora Avenida",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.ts"], // or .js if using JS
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
