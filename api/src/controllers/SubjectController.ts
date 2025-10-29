import type { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Subject } from "../entities/Subject"
import { Professor } from "../entities/Professor"
import { validate } from "class-validator"

export class SubjectController {
  async create(req: Request, res: Response) {
    try {
      const { name, code, workload, description, professorId } = req.body

      const subjectRepository = AppDataSource.getRepository(Subject)
      const professorRepository = AppDataSource.getRepository(Professor)

      const professor = await professorRepository.findOne({ where: { id: professorId } })

      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado" })
      }

      const subject = subjectRepository.create({
        name,
        code,
        workload,
        description,
        professorId,
      })

      const errors = await validate(subject)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      await subjectRepository.save(subject)

      return res.status(201).json(subject)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao criar disciplina" })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const subjectRepository = AppDataSource.getRepository(Subject)

      const subjects = await subjectRepository.find({
        relations: ["professor", "schedules"],
        order: { name: "ASC" },
      })

      return res.json(subjects)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao listar disciplinas" })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const subjectRepository = AppDataSource.getRepository(Subject)

      const subject = await subjectRepository.findOne({
        where: { id },
        relations: ["professor", "schedules"],
      })

      if (!subject) {
        return res.status(404).json({ error: "Disciplina não encontrada" })
      }

      return res.json(subject)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao buscar disciplina" })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, code, workload, description, professorId } = req.body

      const subjectRepository = AppDataSource.getRepository(Subject)
      const professorRepository = AppDataSource.getRepository(Professor)

      const subject = await subjectRepository.findOne({ where: { id } })

      if (!subject) {
        return res.status(404).json({ error: "Disciplina não encontrada" })
      }

      if (professorId) {
        const professor = await professorRepository.findOne({ where: { id: professorId } })
        if (!professor) {
          return res.status(404).json({ error: "Professor não encontrado" })
        }
      }

      subjectRepository.merge(subject, {
        name,
        code,
        workload,
        description,
        professorId,
      })

      const errors = await validate(subject)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      await subjectRepository.save(subject)

      return res.json(subject)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao atualizar disciplina" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const subjectRepository = AppDataSource.getRepository(Subject)

      const subject = await subjectRepository.findOne({ where: { id } })

      if (!subject) {
        return res.status(404).json({ error: "Disciplina não encontrada" })
      }

      await subjectRepository.remove(subject)

      return res.status(204).send()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao deletar disciplina" })
    }
  }
}
