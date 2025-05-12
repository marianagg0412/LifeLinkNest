import { User } from "src/auth/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  dosage: string;

  @Column('text', { nullable: true })
  frequency: string;

  @ManyToOne(() => User, (user) => user.medications)
  user: User;
}
