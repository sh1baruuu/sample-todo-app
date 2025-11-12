import { Router } from "express";
import { addNewTodo, deleteTodo, getAllTodos, toggleTodo } from "../controllers/todos.controller";

const router = Router();

router.get("/", getAllTodos);

router.post("/", addNewTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id/toggle", toggleTodo); 

export default router;
