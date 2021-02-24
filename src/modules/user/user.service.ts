import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';

@Injectable()
export class UserService {
    constructor(private DbService: DbService) {}

    async addUser(username: string) {
        return this.DbService.getUserRepository().addUser(username);
    }

    async getAllUsers() {
        return this.DbService.getUserRepository().getAllUsers();
    }

    async exists(username: string) {
        return this.DbService.getUserRepository().exists(username);
    }
}
