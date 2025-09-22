import { Request, Response } from "express";
import { Todo } from "../models/todo.model";
import { 
  createTodoSchema, 
  updateTodoSchema, 
  CreateTodoInput, 
  UpdateTodoInput 
} from "../schemas/todo.schema";

// Types express avec body typé
type CreateTodoRequest = Request<{}, {}, CreateTodoInput>;
type UpdateTodoRequest = Request<{ id: string }, {}, UpdateTodoInput>;

export async function createTodo(req: CreateTodoRequest, res: Response) {
  try {
    const parsed = createTodoSchema.parse(req.body); // sécurité runtime
    const todo = await Todo.create(parsed);

    return res.status(201).json(todo);

  } catch (err: any) {

    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }

    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTodos(_req: Request, res: Response) {
  try {
    const todos = await Todo.find().lean();
    return res.json(todos);
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateTodo(req: UpdateTodoRequest, res: Response) {
  try {
    const { id } = req.params;
    const parsed = updateTodoSchema.parse(req.body);
    const todo = await Todo.findByIdAndUpdate(id, parsed, { new: true });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json(todo);
  
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTodoById(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id).lean();
    
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json(todo);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTodo(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo deleted", id })
  
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}