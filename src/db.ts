import path from "path";
import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

const IS_TEST_ENV = process.env.NODE_ENV === "test";

export const DATABASE_NAME = !IS_TEST_ENV
  ? (process.env.DATABASE_NAME as string)
  : (process.env.DATABASE_NAME as string) + "_test";

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
  database: DATABASE_NAME,
  synchronize: true,
  entities: [path.resolve(__dirname, "**/*.entity.{js,ts}")],
  migrations: [],
  subscribers: [],
});

export async function connectDb() {
  await coreDb.initialize();
  return coreDb;
}

export async function connectWithoutDatabase() {
  const connection = new DataSource(dbConfig);
  await connection.initialize();

  return connection;
}
