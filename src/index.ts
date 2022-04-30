import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World!" });
});

app.listen(3000, () => {
  console.log("Server Running!");
});
