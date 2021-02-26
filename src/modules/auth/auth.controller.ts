import { Controller, Get, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login/:username')
    async login(@Param('username') username: string): Promise<AuthDto> {
        const user = await this.authService.authenticate(username);
        return AuthDto.from(user);
    }
}
