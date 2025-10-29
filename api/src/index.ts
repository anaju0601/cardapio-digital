import "reflect-metadata"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import { AppDataSource } from "./config/database"
import { swaggerSpec } from "./config/swagger"
import authRoutes from "./routes/auth.routes"
import professorRoutes from "./routes/professor.routes"
import subjectRoutes from "./routes/subject.routes"
import scheduleRoutes from "./routes/schedule.routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API está funcionando" })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/professors", professorRoutes)
app.use("/api/subjects", subjectRoutes)
app.use("/api/schedules", scheduleRoutes)

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Banco de dados conectado com sucesso!")

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
      console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`)
    })
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao banco de dados:", error)
  })
