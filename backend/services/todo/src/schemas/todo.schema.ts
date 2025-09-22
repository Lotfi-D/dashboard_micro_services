import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().optional()
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).optional(),
  completed: z.boolean().optional()
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
