import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { GeneralUser } from "./models/general.user";

@Injectable()

export class JWTService {
    constructor(
        private jwtService:JwtService
    ){
    }

    async login(payload:GeneralUser){
        const {fullname,email,id}=payload
        return {
            token: this.jwtService.sign({fullname,email,id})
        }
    }
}