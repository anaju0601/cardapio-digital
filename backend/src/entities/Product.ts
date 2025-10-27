import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Category } from "./Category"

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ type: "text" })
  description: string

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number

  @Column({ nullable: true })
  imageUrl: string

  @Column({ default: true })
  available: boolean

  @ManyToOne(
    () => Category,
    (category) => category.products,
  )
  @JoinColumn({ name: "categoryId" })
  category: Category

  @Column()
  categoryId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
