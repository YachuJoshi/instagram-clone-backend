import { Request, Response } from "express";
import { initApp } from "./app";

const { app } = initApp();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
