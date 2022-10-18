import { Inject, Injectable } from '@nestjs/common';
import { comparePassword } from '../../../bcrypt';
import { UsersService } from '../../../users/services/users/users.service';

@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService) { }

    async validateUser(username: string, password: string) {
        const userDB = await this.userService.findUserByUsername(username)
        if (userDB) {
            const matched = comparePassword(password, userDB.password)
            if (matched) {
                return userDB
            } else {
                console.log('Password not match!!');
                return null
            }
        }
        console.log('Validation fail');
        return null
    }
}
