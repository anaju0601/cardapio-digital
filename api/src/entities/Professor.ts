import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { IsEmail, IsNotEmpty } from "class-validator"
import { Subject } from "./Subject"

@Entity("professors")
export class Professor {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  @IsNotEmpty()
  name: string

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column()
  phone: string

  @Column()
  department: string

  @Column()
  specialization: string

  @Column({ default: true })
  active: boolean

  @OneToMany(
    () => Subject,
    (subject) => subject.professor,
  )
  subjects: Subject[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
