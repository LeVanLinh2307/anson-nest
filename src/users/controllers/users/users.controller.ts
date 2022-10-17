import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { SerializeUser } from '../../types/User';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { UseInterceptors } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    getUsers() {
        return this.userService.getUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:username')
    getByUsername(@Param('username') username: string) {
        const user = this.userService.getUserByUsername(username)
        if (user) return new SerializeUser(user)
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }
}
