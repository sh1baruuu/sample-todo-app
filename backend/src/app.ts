import express, { type Express } from "express";
import todosRoutes from "./routes/todos.routes";
import authRoutes from "./routes/auth.routes";
import { logger } from "./middleware/logger.middleware";
import { authMiddleware } from "./middleware/auth.middleware";
import cors from "cors";

const app: Express = express();
app.use(
    cors({
        origin: "*", // must match your frontend URL
        credentials: true, // allows cookies or Authorization headers
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(logger);

// Public routes
app.use("/api", authRoutes);

// Protected routes ( require JWT Bearer Token )
app.use("/api/todos", authMiddleware, todosRoutes);

export default app;
