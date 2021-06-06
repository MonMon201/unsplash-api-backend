import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('/login')
    async login(@Body() authReq: AuthDto): Promise<AuthDto> {
        const { username } = authReq;
        if (username === (process.env.GUEST || 'Guest')) {
            throw new HttpException(
                `Can't login as Guest`,
                HttpStatus.FORBIDDEN,
            );
        }
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new HttpException(
                `${username} doesn't exists.`,
                HttpStatus.UNAUTHORIZED,
            );
        }
        return AuthDto.from(user);
    }

    @Post('/register')
    async register(@Body() authReq: AuthDto): Promise<AuthDto> {
        const { username } = authReq;
        if (username === (process.env.GUEST || 'Guest')) {
            throw new HttpException(
                `Can't register as Guest`,
                HttpStatus.FORBIDDEN,
            );
        }
        const user = await this.userService.getUserByUsername(authReq.username);
        if (user) {
            throw new HttpException(
                `Username ${username} is already in use.`,
                HttpStatus.CONFLICT,
            );
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
