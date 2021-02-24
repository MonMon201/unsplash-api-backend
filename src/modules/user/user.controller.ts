import { Controller, Get, Post, Param, BadRequestException, HttpException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/getAllUsers')
    async getAllUsers(): Promise<UserDTO[]> {
        const users = await this.userService.getAllUsers();
        const usersDtos = users.map((user) => UserDTO.from(user));
        return usersDtos;
    }

    @Post('/addUser/:username')
    async addUser(@Param('username') username: string): Promise<UserDTO | Error> {
        if (this.userService.exists(username)) {
            throw new HttpException(`${username} username is already in use.`, 409);
        } else {
            return UserDTO.from(await this.userService.addUser(username));
        }
    }
}
