import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User{
    @Prop({required:false})
    id:string
    @Prop()
    fullname:string
    @Prop()
    country:string
    @Prop()
    city:string
    @Prop()
    address:string
    @Prop()
    email:string
    @Prop()
    password:string
    @Prop({required:false})
    cellphone:string
}

export const UserSchema=SchemaFactory.createForClass(User);