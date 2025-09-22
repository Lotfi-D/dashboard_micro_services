import { Router } from "express";
import { 
  createTodo, 
  getTodos, 
  updateTodo, 
  getTodoById, 
  deleteTodo 
} from "../controllers/todo.controller";

const router = Router();

router.post("/todo", createTodo);
router.get("/todo", getTodos);
router.get("/todo/:id", getTodoById);
router.patch("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

export default router;
