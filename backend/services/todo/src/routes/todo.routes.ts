import { Router } from "express";
import { 
  createTodo, 
  getTodos, 
  updateTodo, 
  getTodoById, 
  deleteTodo 
} from "../controllers/todo.controller";

const router = Router();

router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
