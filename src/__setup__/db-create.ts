import { connectWithoutDatabase } from "../db";

export async function createDb(dbName: string) {
  const connection = await connectWithoutDatabase();

  await connection.query(`CREATE DATABASE "${dbName}"`);

  await connection.destroy();
}
