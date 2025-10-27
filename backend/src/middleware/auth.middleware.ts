import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string }
    ;(req as AuthRequest).user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" })
  }
}
