import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GeneralUser } from './models/general.user';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Login } from './models/login';


@Controller('users')
export class UsersController {
    constructor(
        private userSvc:UsersService
        ){
    }

    @Post('sign-up')
    async create(@Body() user:GeneralUser){
        return await this.userSvc.create(user)
    }

    @Post('update')
    async update(@Body() user:GeneralUser){
        return await this.userSvc.update(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('findByFilter')
    async find(@Body() filter:any){
        return await this.userSvc.findByFilter(filter)
    }

    @Post('login')
    async login(@Body() login:Login){
        return this.userSvc.login(login);
    }

}
