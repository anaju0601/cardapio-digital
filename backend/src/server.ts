import express from "express"
import cors from "cors"
import helmet from "helmet"
import swaggerUi from "swagger-ui-express"
import { AppDataSource } from "./config/database"
import { swaggerSpec } from "./config/swagger"
import authRoutes from "./routes/auth.routes"
import productRoutes from "./routes/product.routes"
import categoryRoutes from "./routes/category.routes"
import { errorHandler } from "./middleware/error.middleware"

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL
].filter(Boolean)

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)

// Error handling
app.use(errorHandler)

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`)
    })
  })
  .catch((error) => {
    console.error("Database connection failed:", error)
    process.exit(1)
  })

export default app
