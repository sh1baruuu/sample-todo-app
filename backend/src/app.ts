import express, { type Express } from "express";
import todosRoutes from "./routes/todos.routes";
import authRoutes from "./routes/auth.routes";
import { logger } from "./middleware/logger.middleware";
import { authMiddleware } from "./middleware/auth.middleware";

const app: Express = express();

app.use(express.json());
app.use(logger);

// Public routes
app.use("/api", authRoutes);    

// Protected routes ( require JWT Bearer Token )
app.use("/api/todos", authMiddleware, todosRoutes);

export default app;
