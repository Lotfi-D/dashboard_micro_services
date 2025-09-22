import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

export const authRouter = Router();
authRouter.post("/auth/login", login);
authRouter.post("/auth/signup", signup);
