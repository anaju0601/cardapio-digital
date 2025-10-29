import type { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Professor } from "../entities/Professor"
import { validate } from "class-validator"

export class ProfessorController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, phone, department, specialization } = req.body

      const professorRepository = AppDataSource.getRepository(Professor)

      const professorExists = await professorRepository.findOne({ where: { email } })

      if (professorExists) {
        return res.status(400).json({ error: "Professor com este email já existe" })
      }

      const professor = professorRepository.create({
        name,
        email,
        phone,
        department,
        specialization,
      })

      const errors = await validate(professor)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      await professorRepository.save(professor)

      return res.status(201).json(professor)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao criar professor" })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const professorRepository = AppDataSource.getRepository(Professor)

      const professors = await professorRepository.find({
        relations: ["subjects"],
        order: { name: "ASC" },
      })

      return res.json(professors)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao listar professores" })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const professorRepository = AppDataSource.getRepository(Professor)

      const professor = await professorRepository.findOne({
        where: { id },
        relations: ["subjects", "subjects.schedules"],
      })

      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado" })
      }

      return res.json(professor)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao buscar professor" })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, email, phone, department, specialization, active } = req.body

      const professorRepository = AppDataSource.getRepository(Professor)

      const professor = await professorRepository.findOne({ where: { id } })

      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado" })
      }

      if (email && email !== professor.email) {
        const emailExists = await professorRepository.findOne({ where: { email } })
        if (emailExists) {
          return res.status(400).json({ error: "Email já está em uso" })
        }
      }

      professorRepository.merge(professor, {
        name,
        email,
        phone,
        department,
        specialization,
        active,
      })

      const errors = await validate(professor)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      await professorRepository.save(professor)

      return res.json(professor)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao atualizar professor" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const professorRepository = AppDataSource.getRepository(Professor)

      const professor = await professorRepository.findOne({ where: { id } })

      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado" })
      }

      await professorRepository.remove(professor)

      return res.status(204).send()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao deletar professor" })
    }
  }
}
