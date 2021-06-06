import { Injectable, HttpException } from '@nestjs/common';
import { User } from 'src/db/models/user.entity';
import { UserRepository } from 'src/db/repositories/user.repository';
import { DbService } from '../../db/db.service';

@Injectable()
export class UserService {
    private userRepository: UserRepository;

    constructor(private dbService: DbService) {
        this.userRepository = this.dbService.getUserRepository();
    }

    async addUser(username: string): Promise<User> {
        return this.userRepository.addUser(username);
    }

    async getUserByid(userId: string): Promise<User> {
        return this.userRepository.getUserByid(userId);
    }

    async getUserByUsername(username: string): Promise<User> {
        return this.userRepository.getUserByUsername(username);
    }
}
