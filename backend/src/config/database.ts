import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Product } from "../entities/Product"
import { Category } from "../entities/Category"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "cardapio_db",
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [User, Product, Category],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
})
