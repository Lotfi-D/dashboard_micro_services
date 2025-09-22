import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { credentialsSchema, type Credentials } from "../schemas/user.schema";


const signup = async (req: Request<{}, Credentials>, res: Response) => {
  const parsed = credentialsSchema.safeParse(req.body);
  
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({ data: { email, password: passwordHash } });
    
    const accessToken = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { algorithm: "HS256", expiresIn: "1h", issuer: "users", audience: "dashboard" }
    );

    return res.status(201).json({ id: user.id, email: user.email, accessToken });
  
  } catch (e: any) {
    
    if (e.code === "P2002") {
      return res.status(409).json({ error: "email already exists" });
    }
    
    return res.status(500).json({ error: "server_error" });
  }
}

const login = async ( req: Request<{}, Credentials>, res: Response) => {
  const parsed = credentialsSchema.safeParse(req.body);
  
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  
  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  const verifyPassword = await bcrypt.compare(password, user.password);
  
  if (!verifyPassword) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { algorithm: "HS256", expiresIn: "1h", issuer: "users", audience: "dashboard" }
  );

  return res.json({ accessToken: token });
}


export { signup, login }