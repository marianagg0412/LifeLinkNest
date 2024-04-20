import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class Product extends Document {

    @Prop({
        default: "organ"
    })
    tittle: string;

    @Prop({
        default:0
    })
    price: number;

    @Prop({
        nullable: true

    })
    description: string;

    @Prop({
        unique: true,
        
        // index: true,
    })
    slug: string;

    @Prop({
        default:0
        // index: true,
    })
    stock: number;

    @Prop({
        array:true
    })
    bloodType: string[]

    @Prop({
        default: "no specified"
        // index: true,
    })
    gender:string;

    @Prop({
        array:true,
        default: []
    })
    tags:string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
