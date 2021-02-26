import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/db/models/user.type';
import { DbService } from '../../db/db.service';
import { UserRepository } from '../../db/repositories/user.repository';

@Injectable()
export class AuthService {
    private userRepository: UserRepository;

    constructor(private dbService: DbService) {
        this.userRepository = this.dbService.getUserRepository();
    }

    async authenticate(username: string): Promise<User> {
        if (await this.userRepository.exists(username)) {
            return this.userRepository.getUserByUsername(username);
        } else {
            throw new BadRequestException(`${username} doesn't exists.`);
        }
    }
}
