import type { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Category } from "../entities/Category"

const categoryRepository = AppDataSource.getRepository(Category)

export class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryRepository.find({
        relations: ["products"],
        order: { createdAt: "DESC" },
      })
      return res.json(categories)
    } catch (error) {
      console.error("Get categories error:", error)
      return res.status(500).json({ message: "Erro ao buscar categorias" })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const category = await categoryRepository.findOne({
        where: { id },
        relations: ["products"],
      })

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" })
      }

      return res.json(category)
    } catch (error) {
      console.error("Get category error:", error)
      return res.status(500).json({ message: "Erro ao buscar categoria" })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, imageUrl } = req.body

      const existingCategory = await categoryRepository.findOne({ where: { name } })
      if (existingCategory) {
        return res.status(400).json({ message: "Categoria já existe" })
      }

      const category = categoryRepository.create({ name, description, imageUrl })
      await categoryRepository.save(category)

      return res.status(201).json({
        message: "Categoria criada com sucesso",
        category,
      })
    } catch (error) {
      console.error("Create category error:", error)
      return res.status(500).json({ message: "Erro ao criar categoria" })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, description, imageUrl } = req.body

      const category = await categoryRepository.findOne({ where: { id } })
      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" })
      }

      categoryRepository.merge(category, { name, description, imageUrl })
      await categoryRepository.save(category)

      return res.json({
        message: "Categoria atualizada com sucesso",
        category,
      })
    } catch (error) {
      console.error("Update category error:", error)
      return res.status(500).json({ message: "Erro ao atualizar categoria" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const category = await categoryRepository.findOne({ where: { id } })

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" })
      }

      await categoryRepository.remove(category)

      return res.json({ message: "Categoria removida com sucesso" })
    } catch (error) {
      console.error("Delete category error:", error)
      return res.status(500).json({ message: "Erro ao remover categoria" })
    }
  }
}
