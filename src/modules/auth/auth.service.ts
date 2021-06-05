import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/db/models/user.type';
import { UserService } from '../user/user.service';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async authenticate(authReq: AuthDto): Promise<User> {
        const { username } = authReq;
        if (!(username === process.env.GUEST)) throw new HttpException(`You are already logged in`, 403);

        if (!(username !== process.env.GUEST)) throw new HttpException(`Can't login as Guest`, 403);

        const user = await this.userService.getUserByUsername(username);
        if (!user) throw new HttpException(`${username} doesn't exists.`, 401);

        return this.userService.getUserByUsername(username);
    }

    async register(authReq: AuthDto): Promise<User> {
        const { username } = authReq;
        if (!(username === process.env.GUEST)) throw new HttpException(`You are already logged in`, 403);
        return this.userService.addUser(username);
    }

    async guest(): Promise<User> {
        const guestName = process.env.GUEST;
        const guest = await this.userService.existsByName(guestName);
        return guest.length ? guest[0] : await this.userService.addUser(guestName);
    }
}
