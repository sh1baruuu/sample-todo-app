import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import db from "../config/db";
import { todos } from "../db/schema";


// GET /api/todos
export async function getAllTodos(req: Request, res: Response) {
    try {
        const userId = (req as any).user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const todoLists = await db
            .select()
            .from(todos)
            .where(eq(todos.user_id, userId));

        res.status(200).json({
            message: "Todos retrieved successfully",
            count: todoLists.length,
            data: todoLists,
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// POST /api/todos
export async function addNewTodo(req: Request, res: Response) {
    try {
        const user_id = (req as any).user?.id; // from JWT middleware
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const [newTodo] = await db
            .insert(todos)
            .values({ title: title.trim(), user_id })
            .returning();

        res.status(201).json({
            message: "Todo added successfully",
            data: newTodo,
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// DELETE /api/todos/:id
export async function deleteTodo(req: Request, res: Response) {
    try {
        const userId = (req as any).user?.id;
        const todoId = req.params.id;

        const todo = await db
            .select()
            .from(todos)
            .where(eq(todos.id, Number(todoId)))
            .limit(1);

        if (todo.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo[0].user_id !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await db.delete(todos).where(eq(todos.id, Number(todoId)));

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// PATCH /api/todos/:id/toggle
export async function toggleTodo(req: Request, res: Response) {
    try {
        const userId = (req as any).user?.id;
        const todoId = Number(req.params.id);

        if (isNaN(todoId)) {
            return res.status(400).json({ message: "Invalid todo ID" });
        }

        // Fetch the todo to check ownership and current status
        const [todo] = await db
            .select()
            .from(todos)
            .where(eq(todos.id, todoId))
            .limit(1);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.user_id !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Toggle the is_done status
        const updatedTodo = await db
            .update(todos)
            .set({ is_done: !todo.is_done })
            .where(eq(todos.id, todoId))
            .returning(); // returning the updated row

        return res
            .status(200)
            .json({ message: "Todo status toggled", todo: updatedTodo[0] });
    } catch (error) {
        console.error("Toggle Todo Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
