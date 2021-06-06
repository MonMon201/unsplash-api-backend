import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('/login')
    async login(@Body() authReq: AuthDto): Promise<AuthDto> {
        const { username } = authReq;

        if (username === process.env.GUEST) {
            throw new HttpException(`Can't login as Guest`, 403);
        }

        const user = await this.userService.getUserByUsername(username);

        if (!user) {
            throw new HttpException(`${username} doesn't exists.`, 401);
        }

        return AuthDto.from(user);
    }

    @Post('/register')
    async register(@Body() authReq: AuthDto): Promise<AuthDto> {
        const { username } = authReq;
        if (username === process.env.GUEST) {
            throw new HttpException(`Can't register as Guest`, 403);
        }

        const user = await this.userService.getUserByUsername(authReq.username);

        if (user) {
            throw new HttpException(`Username ${username} is already in use.`, 409);
        }

        const newUser = await this.userService.addUser(username);

        return AuthDto.from(newUser);
    }

    @Post('/guest')
    async guest(): Promise<AuthDto> {
        const guest = await this.authService.guest();
        return AuthDto.from(guest);
    }
}
