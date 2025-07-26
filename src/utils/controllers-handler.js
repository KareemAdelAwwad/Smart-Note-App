import { createHandler } from "graphql-http/lib/use/express";
import schema from "../GraphQL/schema/main.schema.js";
// import { globalErrorHandler } from "../middlewares/index.js";
import * as Controller from "../modules/index.js";

export const controllerHandler = (app, express) => {
  app.use("/uploads", express.static("uploads"));
  app.use("/", Controller.authController);
  app.use("/notes", Controller.noteController);

  // GraphQL
  app.use("/graphql", createHandler({ schema }));
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "API is running",
      uptime: process.uptime(),
      timestamp: Date.now()
    });
  });
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  // app.use(globalErrorHandler);
};