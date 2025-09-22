import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/signup", signup);

export default authRouter;
