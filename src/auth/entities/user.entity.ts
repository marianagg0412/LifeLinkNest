import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    // index: true,
  })
  email: string;

  @Prop({
    // select:false,
    // index: true,
  })
  password: string;

  @Prop({
    // select:false,
    // index: true,
  })
  name: string;

  @Prop({
    // select:false,
    // index: true,
  })
  lastname: string;

  @Prop({
    unique: true,
    sparse: true,
    // index: true,
  })
  docnum: string;

  @Prop({
    unique: true,
    // index: true,
  })
  phone: string;

  @Prop({
    default: false,
    // index: true,
  })
  donor: boolean;

  bloodType: string;

  @Prop({
    default: false,
    // index: true,
  })
  recipient: boolean;

  @Prop({
    default: true,
    // index: true,
  })
  isActive: boolean;

  @Prop({
    array: true,
    default: ['user'],
  })
  rol: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
