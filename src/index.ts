import { initApp } from "./app";
import { connectDb } from "./db";

// Initalize App
const { app } = initApp();

// Connection to DB
connectDb().then();
const port = process.env.SERVER_PORT || 8000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
