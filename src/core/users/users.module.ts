import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { JwtModule,JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ConfigModule,ConfigService} from '@nestjs/config';
import { UserUseCases } from './use-cases/user.use-cases';
import { JWTService } from './jwt.service';

@Module({
    imports:[
        JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory:async (config:ConfigService):Promise<JwtModuleOptions>=>({
                secret:config.get('NOTE'),
                global:true,
                signOptions:{expiresIn:'2d'}
            }),
            inject:[ConfigService]
        }),
        MongooseModule.forFeature([
            {name:'users',schema:UserSchema,collection:'users'}
        ])
    ],
    controllers:[
        UsersController
    ],
    providers:[
        AuthService,
        UsersService,
        UserUseCases,
        JWTService
    ],
    exports:[]
})
export class UsersModule {}
