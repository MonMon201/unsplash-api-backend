import { Injectable, HttpException } from '@nestjs/common';
import { User } from 'src/db/models/user.type';
import { UserRepository } from 'src/db/repositories/user.repository';
import { DbService } from '../../db/db.service';

@Injectable()
export class UserService {
    private userRepository: UserRepository;

    constructor(private DbService: DbService) {
        this.userRepository = this.DbService.getUserRepository();
    }

    async addUser(username: string): Promise<User> {
        const user = this.getUserByUsername(username);
        if (user) {
            throw new HttpException(`${username} username is already in use.`, 409);
        } else {
            return this.userRepository.addUser(username);
        }
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    async getUserByUsername(username: string): Promise<User>{
        return this.userRepository.getUserByUsername(username);
    }

    async exists(userId: string): Promise<User> {
        return this.userRepository.exists(userId);
    }
}
