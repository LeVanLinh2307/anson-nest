import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../service/auth/auth.service";
import { UnauthorizedException } from "@nestjs/common/exceptions";

@Injectable()
export class LocalStragety extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super({
            usernameField: 'email'
        })
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}