import { coreDb } from "../db";
import { User } from "./user.entity";

export const UserRepository = coreDb.getRepository(User).extend({});
