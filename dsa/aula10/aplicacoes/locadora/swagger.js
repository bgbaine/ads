import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Locadora Avenida API",
      version: "1.0.0",
      description: "Documentacao da API Locadora Avenida",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.ts"], // or .js if using JS
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
