import { Injectable } from '@nestjs/common';
import { User } from 'src/db/models/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async guest(): Promise<User> {
        const guestName = process.env.GUEST || '';
        const guest = await this.userService.getUserByUsername(guestName);
        return guest || this.userService.addUser(guestName);
    }
}
