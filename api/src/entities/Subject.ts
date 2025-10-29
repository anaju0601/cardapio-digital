import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { IsNotEmpty } from "class-validator"
import { Professor } from "./Professor"
import { Schedule } from "./Schedule"

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  @IsNotEmpty()
  name: string

  @Column()
  code: string

  @Column()
  workload: number

  @Column({ nullable: true })
  description: string

  @Column()
  professorId: string

  @ManyToOne(
    () => Professor,
    (professor) => professor.subjects,
  )
  @JoinColumn({ name: "professorId" })
  professor: Professor

  @OneToMany(
    () => Schedule,
    (schedule) => schedule.subject,
  )
  schedules: Schedule[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
