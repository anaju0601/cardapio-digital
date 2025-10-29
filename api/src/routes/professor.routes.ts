import { Router } from "express"
import { ProfessorController } from "../controllers/ProfessorController"
import { authMiddleware } from "../middleware/auth"

const router = Router()
const professorController = new ProfessorController()

/**
 * @swagger
 * /api/professors:
 *   post:
 *     summary: Criar novo professor
 *     tags: [Professors]
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
 *               - email
 *               - phone
 *               - department
 *               - specialization
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *               specialization:
 *                 type: string
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 */
router.post("/", authMiddleware, (req, res) => professorController.create(req, res))

/**
 * @swagger
 * /api/professors:
 *   get:
 *     summary: Listar todos os professores
 *     tags: [Professors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores
 */
router.get("/", authMiddleware, (req, res) => professorController.list(req, res))

/**
 * @swagger
 * /api/professors/{id}:
 *   get:
 *     summary: Buscar professor por ID
 *     tags: [Professors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do professor
 */
router.get("/:id", authMiddleware, (req, res) => professorController.getById(req, res))

/**
 * @swagger
 * /api/professors/{id}:
 *   put:
 *     summary: Atualizar professor
 *     tags: [Professors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *               specialization:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Professor atualizado
 */
router.put("/:id", authMiddleware, (req, res) => professorController.update(req, res))

/**
 * @swagger
 * /api/professors/{id}:
 *   delete:
 *     summary: Deletar professor
 *     tags: [Professors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Professor deletado
 */
router.delete("/:id", authMiddleware, (req, res) => professorController.delete(req, res))

export default router
