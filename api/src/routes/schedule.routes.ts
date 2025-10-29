import { Router } from "express"
import { ScheduleController } from "../controllers/ScheduleController"
import { authMiddleware } from "../middleware/auth"

const router = Router()
const scheduleController = new ScheduleController()

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Criar novo horário
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dayOfWeek
 *               - startTime
 *               - endTime
 *               - classroom
 *               - subjectId
 *             properties:
 *               dayOfWeek:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               classroom:
 *                 type: string
 *               subjectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Horário criado com sucesso
 */
router.post("/", authMiddleware, (req, res) => scheduleController.create(req, res))

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Listar todos os horários
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de horários
 */
router.get("/", authMiddleware, (req, res) => scheduleController.list(req, res))

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     summary: Buscar horário por ID
 *     tags: [Schedules]
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
 *         description: Dados do horário
 */
router.get("/:id", authMiddleware, (req, res) => scheduleController.getById(req, res))

/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     summary: Atualizar horário
 *     tags: [Schedules]
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
 *               dayOfWeek:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               classroom:
 *                 type: string
 *               subjectId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Horário atualizado
 */
router.put("/:id", authMiddleware, (req, res) => scheduleController.update(req, res))

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     summary: Deletar horário
 *     tags: [Schedules]
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
 *         description: Horário deletado
 */
router.delete("/:id", authMiddleware, (req, res) => scheduleController.delete(req, res))

export default router
