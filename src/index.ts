import { initApp } from "./app";
import { connectDb } from "./db";

async function startServer() {
  const { app } = initApp();
  await connectDb();
  const port = process.env.SERVER_PORT || 8000;
  app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
  });
}

startServer();
