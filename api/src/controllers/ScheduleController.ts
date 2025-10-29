import type { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Schedule } from "../entities/Schedule"
import { Subject } from "../entities/Subject"

export class ScheduleController {
  async create(req: Request, res: Response) {
    try {
      const { dayOfWeek, startTime, endTime, classroom, subjectId } = req.body

      const scheduleRepository = AppDataSource.getRepository(Schedule)
      const subjectRepository = AppDataSource.getRepository(Subject)

      const subject = await subjectRepository.findOne({ where: { id: subjectId } })

      if (!subject) {
        return res.status(404).json({ error: "Disciplina não encontrada" })
      }

      const schedule = scheduleRepository.create({
        dayOfWeek,
        startTime,
        endTime,
        classroom,
        subjectId,
      })

      await scheduleRepository.save(schedule)

      return res.status(201).json(schedule)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao criar horário" })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const scheduleRepository = AppDataSource.getRepository(Schedule)

      const schedules = await scheduleRepository.find({
        relations: ["subject", "subject.professor"],
        order: { dayOfWeek: "ASC", startTime: "ASC" },
      })

      return res.json(schedules)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao listar horários" })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const scheduleRepository = AppDataSource.getRepository(Schedule)

      const schedule = await scheduleRepository.findOne({
        where: { id },
        relations: ["subject", "subject.professor"],
      })

      if (!schedule) {
        return res.status(404).json({ error: "Horário não encontrado" })
      }

      return res.json(schedule)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao buscar horário" })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { dayOfWeek, startTime, endTime, classroom, subjectId } = req.body

      const scheduleRepository = AppDataSource.getRepository(Schedule)
      const subjectRepository = AppDataSource.getRepository(Subject)

      const schedule = await scheduleRepository.findOne({ where: { id } })

      if (!schedule) {
        return res.status(404).json({ error: "Horário não encontrado" })
      }

      if (subjectId) {
        const subject = await subjectRepository.findOne({ where: { id: subjectId } })
        if (!subject) {
          return res.status(404).json({ error: "Disciplina não encontrada" })
        }
      }

      scheduleRepository.merge(schedule, {
        dayOfWeek,
        startTime,
        endTime,
        classroom,
        subjectId,
      })

      await scheduleRepository.save(schedule)

      return res.json(schedule)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao atualizar horário" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const scheduleRepository = AppDataSource.getRepository(Schedule)

      const schedule = await scheduleRepository.findOne({ where: { id } })

      if (!schedule) {
        return res.status(404).json({ error: "Horário não encontrado" })
      }

      await scheduleRepository.remove(schedule)

      return res.status(204).send()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao deletar horário" })
    }
  }
}
