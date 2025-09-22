import { Router } from "express";
import { createUser, deleteUsers, retrieveUsers, retrieveOneUser, updateUser } from "../controllers/users.controller";

const usersRouter: Router = Router();

usersRouter.post("/users/create", createUser);
usersRouter.get("/users", retrieveUsers);
usersRouter.get("/users/:id", retrieveOneUser)
usersRouter.patch("/users/:id", updateUser)
usersRouter.delete("/users/:id", deleteUsers);

export { usersRouter }
