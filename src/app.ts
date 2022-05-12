import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import { errorHandler } from "./error";

export function initApp() {
  const app: Application = express();
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/api", routes);
  app.use(errorHandler);

  return { app };
}
