import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Professor } from "../entities/Professor"
import { Subject } from "../entities/Subject"
import { Schedule } from "../entities/Schedule"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number.parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USER || "admin",
  password: process.env.DATABASE_PASSWORD || "admin123",
  database: process.env.DATABASE_NAME || "academic_system",
  synchronize: true, // Em produção, usar migrations
  logging: process.env.NODE_ENV === "development",
  entities: [User, Professor, Subject, Schedule],
  subscribers: [],
  migrations: [],
})
