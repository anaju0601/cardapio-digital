import type { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { User } from "../entities/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validate } from "class-validator"

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name, role } = req.body

      const userRepository = AppDataSource.getRepository(User)

      const userExists = await userRepository.findOne({ where: { email } })

      if (userExists) {
        return res.status(400).json({ error: "Usuário já existe" })
      }

      const user = userRepository.create({
        email,
        password,
        name,
        role: role || "user",
      })

      const errors = await validate(user)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword

      await userRepository.save(user)

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", {
        expiresIn: "7d",
      })

      return res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao registrar usuário" })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const userRepository = AppDataSource.getRepository(User)

      const user = await userRepository.findOne({ where: { email } })

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" })
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return res.status(401).json({ error: "Credenciais inválidas" })
      }

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", {
        expiresIn: "7d",
      })

      return res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao fazer login" })
    }
  }

  async me(req: Request, res: Response) {
    try {
      const userId = (req as any).userId

      const userRepository = AppDataSource.getRepository(User)

      const user = await userRepository.findOne({ where: { id: userId } })

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" })
      }

      return res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao buscar usuário" })
    }
  }
}
