import { SwaggerConfig } from "@ioc:Adonis/Addons/Swagger";
import { chartResponseSchema } from "App/Models/Schemas/Chart";
import { userSchema } from "App/Models/Schemas/User";

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: "doc", // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: "/docs/swagger.json",
  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints
  options: {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "YamYam API",
        version: "1.0.0",
        description: "YamYam API endpoints Documentation",
      },
      components: {
        schemas: {
          User: userSchema,
          ChartResponse: chartResponseSchema,
        },
      },
    },

    apis: ["app/Controllers/Http/UserController.ts"],

    basePath: "/",
  },

  mode: process.env.NODE_ENV === "production" ? "PRODUCTION" : "RUNTIME",
  specFilePath: "docs/openapi.json",
} as SwaggerConfig;
