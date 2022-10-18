import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { SerializeUser } from '../../types/User';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { Body, Post, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { UserNotFoundException } from '../../exceptions/UserNotFound.exception';
import { CreateUserDto } from '../../dto/CreateUser.dto';
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
    @Get('/username/:username')
    getByUsername(@Param('username') username: string) {
        const user = this.userService.getUserByUsername(username)
        if (user) return new SerializeUser(user)
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('id/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        const user = this.userService.getUserById(id)
        if (user) return new SerializeUser(user)
        else {
            throw new UserNotFoundException('User was not found!!!', 500)
        }
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);

        return this.userService.createUser(createUserDto)
    }
}
