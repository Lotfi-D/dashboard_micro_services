import express from "express";
import { usersRouter } from "./routes/users.routes";
import { authRouter } from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.get("/health", (_req, res) => res.json({ ok: true, service: "users" }));

app.use(usersRouter);
app.use(authRouter)

export default app;
