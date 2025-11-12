import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import db from "../config/db";



// POST /api/register
export async function registerUser(req: Request, res: Response) {
    try {
        const { name, email, password } = await req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Name, email, and password are required" });
        }

        const existing = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        await db.insert(users).values({ name, email, password: hashed });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// POST /api/login
export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = await req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (user.length === 0)
            return res.status(401).json({ message: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user[0].password!);
        if (!valid)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
