import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/db/models/user.type';
import { UserService } from '../user/user.service';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async authenticate(username: string, authReq: AuthDto): Promise<User> {
        if (authReq.username === process.env.GUEST) {
            if(username !== process.env.GUEST){
                const user = await this.userService.getUserByUsername(username);
                if (user) {
                    return this.userService.getUserByUsername(username);
                } else {
                    throw new HttpException(`${username} doesn't exists.`, 401);
                }
            } else {
                throw new HttpException(`Can't login as Guest`, 403);
            }
        } else {
            throw new HttpException(`You are already logged in`, 403);
        }
    }

    async register(username: string, authReq: AuthDto): Promise<User> {
        if (authReq.username === process.env.GUEST) {
            return this.userService.addUser(username);
        } else {
            throw new HttpException(`You are already logged in`, 403);
        }
    }

    async guest(): Promise<User> {
        const guestName = process.env.GUEST;
        const guest = await this.userService.existsByName(guestName);
        if (guest.length) {
            return guest[0];
        } else {
            return await this.userService.addUser(guestName);
        }
    }
}
