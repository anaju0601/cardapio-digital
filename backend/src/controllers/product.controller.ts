import type { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Product } from "../entities/Product"

const productRepository = AppDataSource.getRepository(Product)

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const products = await productRepository.find({
        relations: ["category"],
        order: { createdAt: "DESC" },
      })
      return res.json(products)
    } catch (error) {
      console.error("Get products error:", error)
      return res.status(500).json({ message: "Erro ao buscar produtos" })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const product = await productRepository.findOne({
        where: { id },
        relations: ["category"],
      })

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" })
      }

      return res.json(product)
    } catch (error) {
      console.error("Get product error:", error)
      return res.status(500).json({ message: "Erro ao buscar produto" })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, price, imageUrl, categoryId, available } = req.body

      const product = productRepository.create({
        name,
        description,
        price,
        imageUrl,
        categoryId,
        available,
      })

      await productRepository.save(product)

      return res.status(201).json({
        message: "Produto criado com sucesso",
        product,
      })
    } catch (error) {
      console.error("Create product error:", error)
      return res.status(500).json({ message: "Erro ao criar produto" })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, description, price, imageUrl, categoryId, available } = req.body

      const product = await productRepository.findOne({ where: { id } })
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" })
      }

      productRepository.merge(product, {
        name,
        description,
        price,
        imageUrl,
        categoryId,
        available,
      })

      await productRepository.save(product)

      return res.json({
        message: "Produto atualizado com sucesso",
        product,
      })
    } catch (error) {
      console.error("Update product error:", error)
      return res.status(500).json({ message: "Erro ao atualizar produto" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const product = await productRepository.findOne({ where: { id } })

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" })
      }

      await productRepository.remove(product)

      return res.json({ message: "Produto removido com sucesso" })
    } catch (error) {
      console.error("Delete product error:", error)
      return res.status(500).json({ message: "Erro ao remover produto" })
    }
  }
}
