import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { User } from 'src/db/models/user.type';
import { UserService } from '../user.service';

@Injectable()
export class UserGuestValidationService {
    constructor(private userService: UserService) {}

    async guestCheck(userId: string): Promise<User> {
        const guest = await this.userService.getUserByUsername(process.env.GUEST);
        if (guest) {
            return this.userCheck(userId, guest);
        } else {
            const newGuest = await this.userService.addUser(process.env.GUEST);
            return this.userCheck(userId, newGuest);
        }
    }

    async userCheck(userId: string, guest: User): Promise<User> {
        const user = await (userId === guest.username ? guest : this.userService.exists(userId));
        if (user) {
            return user;
        } else {
            throw new HttpException(`User doesn\'t exists`, 400);
        }
    }
}
