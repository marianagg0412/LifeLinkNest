/* eslint-disable prettier/prettier */
import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  recordDate: Date;

  @ManyToOne(() => User, (user) => user.medicalRecords)
  user: User;
}

