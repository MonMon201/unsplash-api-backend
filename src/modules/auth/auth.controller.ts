import { Controller, Post, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login/:username')
    async login(@Param('username') username: string, @Body() authReq: AuthDto): Promise<AuthDto> {
        const user = await this.authService.authenticate(username, authReq);
        return AuthDto.from(user);
    }

    @Post('/register/:username')
    async register(@Param('username') username: string, @Body() authReq: AuthDto): Promise<AuthDto> {
        const user = await this.authService.register(username, authReq);
        return AuthDto.from(user);
    }

    @Post('/guest')
    async guest(): Promise<AuthDto> {
        const guest = await this.authService.guest();
        return AuthDto.from(guest);
    }
}
