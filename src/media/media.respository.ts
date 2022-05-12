import { coreDb } from "../db";
import { Media } from "./media.entity";

export const MediaRepository = coreDb.getRepository(Media).extend({});
