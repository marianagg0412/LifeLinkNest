import { User } from "src/auth/entities/user.entity";
import { Medication } from "src/medication/entities/medication.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

@Entity('medical_conditions')
export class MedicalCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('enum', { enum: ['Mild', 'Moderate', 'Severe'], default: 'Moderate' })
  severity: 'Mild' | 'Moderate' | 'Severe';

  @Column('date', { nullable: true })
  diagnosisDate: Date;

  @Column('simple-array', { nullable: true })
  treatments: string[];

  @Column('enum', { enum: ['Active', 'In Remission', 'Resolved'], default: 'Active' })
  status: 'Active' | 'In Remission' | 'Resolved';

  @ManyToMany(() => Medication)
  @JoinTable()
  medications: Medication[];

  @Column('simple-array', { nullable: true })
  complications: string[];

  @Column('text', { nullable: true })
  healthcareProvider: string;

  @Column('date', { nullable: true })
  followUpDate: Date;

  @Column('text', { nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.medicalConditions)
  user: User;
}