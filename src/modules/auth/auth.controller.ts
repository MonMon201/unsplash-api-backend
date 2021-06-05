import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() authReq: AuthDto): Promise<AuthDto> {
        const user = await this.authService.login(authReq);
        return AuthDto.from(user);
    }

    @Post('/register')
    async register(@Body() authReq: AuthDto): Promise<AuthDto> {
        const user = await this.authService.register(authReq);
        return AuthDto.from(user);
    }

    @Post('/guest')
    async guest(): Promise<AuthDto> {
        const guest = await this.authService.guest();
        return AuthDto.from(guest);
    }
}
