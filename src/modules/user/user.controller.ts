import { Controller, Get, Post, Param } from '@nestjs/common';
import { userDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/getAllUsers')
    async getAllUsers(): Promise<userDto[]> {
        const users = await this.userService.getAllUsers();
        return users.map((user) => userDto.from(user));
    }

    @Post('/addUser/:username')
    async addUser(@Param('username') username: string): Promise<userDto> {
        return this.userService.addUser(username);
    }
}
