import { initApp } from "../app";
import { setupApp, closeApp } from "./appHelpers";
import { createDb } from "../__setup__/db-create";
import { connectDb, coreDb, DATABASE_NAME } from "../db";

beforeAll(async () => {
  const { app } = initApp();
  await setupApp(app);
  await createDb(DATABASE_NAME);
  await connectDb();
});

beforeEach(async () => {
  await coreDb.synchronize(true);
});

afterAll(async () => {
  await coreDb.destroy();
  await closeApp();
});
