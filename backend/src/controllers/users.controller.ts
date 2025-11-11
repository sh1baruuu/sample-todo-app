import { Request, Response } from 'express';
import { getAllUsers } from '../services/users.service';

export async function getUsers(req: Request, res: Response) {
  const users = await getAllUsers();
  res.json(users);
}
