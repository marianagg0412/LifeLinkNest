/* eslint-disable prettier/prettier */
import { Allergy } from 'src/allergy/entities/allergy.entity';
import { MedicalCondition } from 'src/medical-condition/entities/medical-condition.entity';
import { MedicalVisit } from 'src/medical-visit/entities/medical-visit.entity';
import { Medication } from 'src/medication/entities/medication.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  name: string;

  @Column('text')
  lastname: string;

  @Column('text', {
    nullable: false,
  })
  docnum_type: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  docnum: string;

  @Column('text')
  phone: string;

  @Column('bool', {
    default: false,
  })
  donor: boolean;

  @Column('text')
  bloodType: string;

  @Column('bool', {
    default: false,
  })
  recipient: boolean;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @BeforeInsert()
  checkFieldBIns() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldBUp() {
    this.checkFieldBIns();
  }

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[];

  @OneToMany(() => Allergy, (allergy) => allergy.user, { cascade: true })
  allergies: Allergy[];

  @OneToMany(() => Medication, (medication) => medication.user, { cascade: true })
  medications: Medication[];

  @OneToMany(() => MedicalVisit, (visit) => visit.user, { cascade: true })
  medicalVisits: MedicalVisit[];

  @OneToMany(() => MedicalCondition, (condition) => condition.user, { cascade: true })
  medicalConditions: MedicalCondition[];
}
