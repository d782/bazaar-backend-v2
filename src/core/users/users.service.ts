import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserUseCases } from './use-cases/user.use-cases';
import { GeneralUser } from './models/general.user';
import { JWTService } from './jwt.service';
import * as bcrypt from 'bcrypt';
import { Login } from './models/login';
import { LoginContext, LoginWithEmail, LoginWithTelephone } from './strategy/login.strategy';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  saltRounds=10;
  constructor(
    private userUseCases:UserUseCases,
    private jwtService:JWTService
    ) {
    }

    async create(newUser:GeneralUser):Promise<GeneralUser|HttpException> {
        try {
            if(!newUser.email || !newUser.password){
                return new HttpException("Email or password has not provided!",HttpStatus.BAD_REQUEST)
            }
            const filter={
                query:{email:newUser.email},
                projection:{_id:1}
            }
            const findUser=await this.userUseCases.findUser(filter);
            if(findUser){
                return new HttpException('User already exists',HttpStatus.BAD_REQUEST)
            }
            newUser.password= await bcrypt.hash(newUser.password,this.saltRounds)
            newUser.id=uuidv4();
            const user = await this.userUseCases.createUser(newUser);
            return user
        } catch (error) {
            return new HttpException('Internal server error',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(user:GeneralUser):Promise<HttpException> {
        try {
            const {id}=user;
            return await this.userUseCases.updateUser(user,id);
        } catch (error) {
            return new HttpException('failed',HttpStatus.BAD_REQUEST);
        }
    }

    async findByFilter(filter:any):Promise<GeneralUser[]|HttpException> {
        try {
            return await this.userUseCases.getUsers(filter);
        } catch (error) {
            return new HttpException('failed',HttpStatus.BAD_REQUEST);
        }
    }
    
    async login(user:Login){
        try {
            const context=new LoginContext();

            if(!user.email){
                context.setStrategy(new LoginWithTelephone())
            }
            if(!user.cellphone){
                context.setStrategy(new LoginWithEmail())
            }
            const query=context.executeStrategy(user);
            const filter={
                query,
                projection:{fullname:1,email:1,password:1}
            }
            const findUser=await this.userUseCases.findUser(filter);
            if(!findUser){
                throw new UnauthorizedException();
            }
            const validatePassword=await bcrypt.compare(user.password,findUser.password);
            if(!validatePassword){
                return new HttpException('Wrong email or password',HttpStatus.BAD_REQUEST);
            }
            return this.jwtService.login(findUser);
        } catch (error) {
            return new HttpException('Internal server error',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
