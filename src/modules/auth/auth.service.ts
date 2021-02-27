import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/db/models/user.type';
import { DbService } from '../../db/db.service';
import { UserRepository } from '../../db/repositories/user.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {
    }

    async authenticate(username: string): Promise<User> {
        const user = await this.userService.getUserByUsername(username);
        if (user) {
            return this.userService.getUserByUsername(username);
        } else {
            throw new BadRequestException(`${username} doesn't exists.`);
        }
    }

    async register(username: string): Promise<User> {
        return this.userService.addUser(username);
    }

    async guest(): Promise<User> {
        const guest = await this.userService.getUserByUsername(process.env.GUEST);
        if (guest) {
            return guest;
        } else {
            const newGuest = await this.userService.addUser(process.env.GUEST);
            return newGuest;
        }
    }
}
