import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    name:string;

    @Column('text')
    lastname:string;

    @Column('text', {
        nullable: false
    })
    docnum_type: string;

    @Column('text', {
        unique: true,
        nullable: false
    })
    docnum: string;

    @Column('text')
    phone: string;

    @Column('bool', {
        default: false
    })
    donor: boolean;

    @Column('text')
    bloodType: string;

    @Column('bool', {
        default: false
    })
    recipient: boolean;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text',{
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkFieldBIns(){
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldBUp(){
        this.checkFieldBIns();
    }
}
