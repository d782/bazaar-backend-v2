import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserUseCases } from "./use-cases/user.use-cases";


@Injectable()

export class AuthService extends PassportStrategy(Strategy) {
    
    constructor(
        private usersUseCases:UserUseCases,
        private config:ConfigService
        ){
            super({
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey:config.get('NOTE'),
                ignoreExpiration:false
            })
    }

    async validate(payload:any) {
        return payload;
    }

    


}