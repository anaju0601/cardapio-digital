import { Router } from "express"
import { SubjectController } from "../controllers/SubjectController"
import { authMiddleware } from "../middleware/auth"

const router = Router()
const subjectController = new SubjectController()

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Criar nova disciplina
 *     tags: [Subjects]
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
 *               - code
 *               - workload
 *               - professorId
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               workload:
 *                 type: number
 *               description:
 *                 type: string
 *               professorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 */
router.post("/", authMiddleware, (req, res) => subjectController.create(req, res))

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Listar todas as disciplinas
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de disciplinas
 */
router.get("/", authMiddleware, (req, res) => subjectController.list(req, res))

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Buscar disciplina por ID
 *     tags: [Subjects]
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
 *         description: Dados da disciplina
 */
router.get("/:id", authMiddleware, (req, res) => subjectController.getById(req, res))

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     summary: Atualizar disciplina
 *     tags: [Subjects]
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
 *               code:
 *                 type: string
 *               workload:
 *                 type: number
 *               description:
 *                 type: string
 *               professorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Disciplina atualizada
 */
router.put("/:id", authMiddleware, (req, res) => subjectController.update(req, res))

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Deletar disciplina
 *     tags: [Subjects]
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
 *         description: Disciplina deletada
 */
router.delete("/:id", authMiddleware, (req, res) => subjectController.delete(req, res))

export default router
