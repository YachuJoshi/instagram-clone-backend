import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./error";

export function initApp() {
  const app: Application = express();
  app.use(express.json());
  app.use(cors());
  app.use("/api", routes);
  app.use(errorHandler);

  return { app };
}
