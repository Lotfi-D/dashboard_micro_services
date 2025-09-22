import { z } from "zod";

// separation between creation and credentials if we need to change or add keys
export const userCreationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

// Types
export type UserCreation = z.infer<typeof updateUserSchema>;
export type Credentials = z.infer<typeof credentialsSchema>;
export type UpdateUserBody = z.infer<typeof updateUserSchema>;
