"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const categoryController = new category_controller_1.CategoryController();
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Listar todas as categorias
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", auth_middleware_1.authMiddleware, categoryController.getAll);
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obter categoria por ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 */
router.get("/:id", auth_middleware_1.authMiddleware, categoryController.getById);
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Criar nova categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pastéis Salgados
 *               description:
 *                 type: string
 *                 example: Pastéis com recheios salgados
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/category.jpg
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Categoria já existe
 */
router.post("/", auth_middleware_1.authMiddleware, categoryController.create);
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualizar categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.put("/:id", auth_middleware_1.authMiddleware, categoryController.update);
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deletar categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.delete("/:id", auth_middleware_1.authMiddleware, categoryController.delete);
exports.default = router;
