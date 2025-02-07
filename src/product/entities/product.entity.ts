import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn('uuid')
        id: string;
    
        @Column('text', {
            nullable: false
        })
        name: string;
    
        @Column({ type: 'float' })
        price: number;
    
        @Column('text')
        description:string;
    
        @Column('text')
        image:string;
    
        @Column('text', {
            nullable: false
        })
        category: string;

        @Column('text', {
            nullable: false
        })
        use:string;
    
        @Column('text', {
            nullable: false
        })
        specialty:string;
    
        @Column('int', {
            default: 1
        })
        availability: number;

        @Column('int', {
            default: 1
        })
        isActive: number;
    
}
