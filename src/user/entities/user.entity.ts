import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class User extends Document {

    @Prop({
        // index: true,
    })
    name: string;

    @Prop({
        // index: true,
    })
    lastame: string;

    @Prop({
        unique: true,
        // index: true,
    })
    docnum: string;

    @Prop({
        unique: true,
        // index: true,
    })
    phone: string;

    donor: boolean;

    recipient: boolean;

    bloodType: string;

    @Prop({
        unique: true,
        // index: true,
    })
    email:string;

    password:string;
}

export const UserSchema = SchemaFactory.createForClass(User);
