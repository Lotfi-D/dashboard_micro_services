import express from "express";
import todoRoutes from "./routes/todo.routes";

const app = express();

app.use(express.json());

// Mount routes (sans préfixe ici)
app.use(todoRoutes);

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;
