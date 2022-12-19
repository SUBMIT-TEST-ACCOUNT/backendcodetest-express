import * as swaggerJsdoc from "swagger-jsdoc";

export const options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "FASTEST ROUTES",
      version: "1.0.0",
      description: "",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["src/api/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
