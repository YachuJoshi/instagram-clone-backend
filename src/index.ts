import { initApp } from "./app";

const { app } = initApp();
const port = process.env.SERVER_PORT || 8000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
