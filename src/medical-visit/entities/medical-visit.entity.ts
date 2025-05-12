import { User } from "src/auth/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('medical_visits')
export class MedicalVisit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  visitDate: Date;

  @Column('text', { nullable: true })
  reason: string;

  @Column('text', { nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.medicalVisits)
  user: User;
}
