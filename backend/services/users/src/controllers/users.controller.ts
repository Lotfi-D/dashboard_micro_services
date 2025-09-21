import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../db/prima";
import type { Prisma } from "@prisma/client";

const createSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const createUser = async (req: Request, res: Response) => {
  const parsed = createSchema.safeParse(req.body);
  
  if (!parsed.success) { 
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: passwordHash },
      select: { id: true, email: true, createdAt: true },
    });
    
    return res.status(201).json(user);

  } catch (e: any) {
    if (e.code === "P2002") {
      return res.status(409).json({ 
        error: "email already exists" 
      });
    }
    
    return res.status(500).json({ 
      error: "server_error" 
    });
  }
}

const retrieveUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: { 
      id: true, 
      email: true, 
      createdAt: true,
    },
    orderBy: { 
      createdAt: "desc" 
    },
  });
  return res.json(users);
}

const retrieveOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const users = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, createdAt: true },
  });

  return res.json(users);
}

const updateSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});
type UpdateBody = z.infer<typeof updateSchema>;

const updateUser = async (
  req: Request<{ id: string }, unknown, UpdateBody>,
  res: Response
) => {
  const { id } = req.params;
  const parsed = updateSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { email, password } = parsed.data;
  if (!email && !password) return res.status(400).json({ error: "no_fields_to_update" });

  const data: Prisma.UserUpdateInput = {
    ...(email ? { email } : {}),
    ...(password ? { passwordHash: await bcrypt.hash(password, 10) } : {}),
  };

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, createdAt: true },
    });

    return res.json(user);

  } catch (e: any) {
    if (e.code === "P2002") {
      return res.status(409).json({ error: "email already exists" });
    }
    
    if (e.code === "P2025") {
      return res.status(404).json({ error: "user_not_found" });
    }

    return res.status(500).json({ error: "server_error" });
  }
}


const deleteUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('ID', id)
  try {
    const user = await prisma.user.delete({ where: { id } });
    return res.status(200).json({ message: "user has been deleted" }); // No Content
    
  } catch (e: any) {

    if (e.code === "P2025") {
      return res.status(404).json({ error: "user notfound" });
    }
    return res.status(500).json({ error: "server_error" });
  }
}

export {
  createUser,
  retrieveUsers,
  retrieveOneUser,
  updateUser,
  deleteUsers
}