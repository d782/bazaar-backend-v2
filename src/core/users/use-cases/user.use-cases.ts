import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { GeneralUser } from "../models/general.user";

@Injectable()

export class UserUseCases {
    constructor(
        @InjectModel('users') private userModel:Model<User>
        ) {
    }

    async createUser(user:GeneralUser):Promise<GeneralUser>{
        const newUser=new this.userModel(user);
        await newUser.save();
        return user;
    }

    async updateUser(user:GeneralUser,id:any):Promise<HttpException>{
        const filter={id:id}
        await this.userModel.updateOne(filter,user,{upsert:true});
        return new HttpException('updated',HttpStatus.CREATED)
    }

    async getUsers(filter:any):Promise<GeneralUser[]>{
        const {query,projection,sort,limit,skip}=filter;
        return (await this.userModel.find(query,projection).sort(sort).limit(limit).skip(skip));
    }

    async findUser(filter:any):Promise<GeneralUser>{
        const {query,projection}=filter;
        return await this.userModel.findOne(query,projection);
    }
}