import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Subject } from "./Subject"

@Entity("schedules")
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  dayOfWeek: string

  @Column()
  startTime: string

  @Column()
  endTime: string

  @Column()
  classroom: string

  @Column()
  subjectId: string

  @ManyToOne(
    () => Subject,
    (subject) => subject.schedules,
  )
  @JoinColumn({ name: "subjectId" })
  subject: Subject

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
