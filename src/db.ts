import path from "path";
import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOSTNAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  logging: false,
  port: 5432,
};

export const coreDb = new DataSource({
  ...dbConfig,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [path.resolve(__dirname, "**/*.entity.{js,ts}")],
  migrations: [],
  subscribers: [],
});

export async function connectDb() {
  await coreDb.initialize();
  console.log("Connected to Database Successfully!");

  return coreDb;
}
