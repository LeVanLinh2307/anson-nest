import { Injectable } from '@nestjs/common';
import { SerializeUser, User } from '../../types/User';
import { plainToClass } from 'class-transformer'

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            username: 'll1',
            password: '123456'
        },
        {
            id: 2,
            username: 'll2',
            password: '123456'
        },
        {
            id: 3,
            username: 'll3',
            password: '123456'
        },
    ]

    getUsers() {
        return this.users.map(user => plainToClass(SerializeUser, user))
    }

    getUserByUsername(username: string) {
        return this.users.find(user => user.username == username)
    }

    getUserById(id: number) {
        return this.users.find(user => user.id == id)
    }
}
