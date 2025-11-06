import "dotenv/config"
import express from "express"
import cors, { CorsOptions } from "cors"
import helmet from "helmet"
import swaggerUi from "swagger-ui-express"
import { AppDataSource } from "./config/database"
import { swaggerSpec } from "./config/swagger"
import authRoutes from "./routes/auth.routes"
import productRoutes from "./routes/product.routes"
import categoryRoutes from "./routes/category.routes"
import { errorHandler } from "./middleware/error.middleware"

const app = express()
const PORT = Number(process.env.PORT) || 3001

const allowedOrigins: string[] = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://black-cliff-09ef7270f.3.azurestaticapps.net",
  process.env.FRONTEND_URL || ""
].filter(Boolean) as string[]

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

// -----------------------------------------------------------
// 🚀 INÍCIO DA CORREÇÃO
// -----------------------------------------------------------
// Diz ao Express para confiar no proxy reverso do Azure
// Isto corrige problemas de 'mixed content' (HTTP/HTTPS) no Swagger
app.set("trust proxy", 1)
// -----------------------------------------------------------
// 🚀 FIM DA CORREÇÃO
// -----------------------------------------------------------

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)

app.use(errorHandler)

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully")

    app.listen(PORT, "0.0.0.0", () => {
      // No Azure, process.env.WEBSITE_HOSTNAME será o URL correto
      const hostname = process.env.WEBSITE_HOSTNAME || `localhost:${PORT}`
      // O log do Swagger estava a mostrar https incorretamente, vamos usar o protocolo correto
      // O 'trust proxy' vai corrigir como o Swagger se apresenta
      console.log(`🚀 Server running at http://${hostname}`)
      console.log(`📘 Swagger docs available at http://${hostname}/api-docs`)
      console.log(`🌐 Allowed origins: ${allowedOrigins.join(", ")}`)
    })
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error)
    process.exit(1)
  })

export default app