import db from '../config/db';
import { users } from '../db/schema';

export async function getAllUsers() {
  return await db.select().from(users);
}
