import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { History } from 'src/db/models/history.type';
import { HistoryRepository } from 'src/db/repositories/history.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class HistoryService {
    private historyRepository: HistoryRepository;

    constructor(
        private dbService: DbService,
        private userService: UserService,
        ) {
        this.historyRepository = this.dbService.getHistoryRepository();
    }

    async getHistoryByUserId(userId: string): Promise<History[]> {
        const user = await this.userService.exists(userId);
        if(user){
            if (await this.historyRepository.exists(userId)) {
                return this.historyRepository.getHistoryByUserId(userId);
            } else {
                return [];
            }
        } else {
            throw new BadRequestException(`User doesn't exists`);
        }
    }

    async getHistoryByQuery(userId: string, query: string): Promise<History> {
        const usersHistories = await this.getHistoryByUserId(userId);
        return usersHistories.filter((history) => history.query === query)[0];
    }
}
