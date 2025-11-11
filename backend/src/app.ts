import express, { type Express } from "express";
import userRoutes from "./routes/user.routes";
import { logger } from "./middleware/logger.middleware";

const app: Express = express();
app.use(express.json());
app.use(logger);

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the Simple Todo App API");
});

export default app;
