import express from "express";
import { usersRouter } from "./routes/users.routes";

const app = express();
app.use(express.json());
app.get("/health", (_req, res) => res.json({ ok: true, service: "users" }));
app.use(usersRouter);

export default app;
