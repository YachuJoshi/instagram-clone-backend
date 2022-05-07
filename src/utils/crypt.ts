import bcrypt from "bcrypt";

const SALT_FACTOR = 10;

export async function encrypt(password: string) {
  return await bcrypt.hash(password, SALT_FACTOR);
}

export async function compareHashed(data: string, source: string) {
  return await bcrypt.compare(data, source);
}
