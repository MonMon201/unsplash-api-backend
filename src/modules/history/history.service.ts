import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { History } from 'src/db/models/history.type';
import { HistoryRepository } from 'src/db/repositories/history.repository';
import { Photo } from '../search/types/photo';
import { UserService } from '../user/user.service';

@Injectable()
export class HistoryService {
    private historyRepository: HistoryRepository;

    constructor(private dbService: DbService) {
        this.historyRepository = this.dbService.getHistoryRepository();
    }

    async getHistoryByid(userId: string): Promise<History[]> {
        if (await this.historyRepository.exists(userId)) {
            return this.historyRepository.getHistoryByid(userId);
        } else {
            return [];
        }
    }

    async getUsersHistoriesByUsersId(userId: string, query: string): Promise<History> {
        const usersHistories = await this.getHistoryByid(userId);
        return usersHistories.filter((history) => history.query === query)[0];
    }

    async getHistoryByQuery(query: string): Promise<History> {
        const usersHistories = await this.historyRepository.getAllHistory();
        return usersHistories.filter((history) => history.query === query)[0];
    }

    async addHistory(userId: string, query: string, photos: Photo[]) {
        const history = await this.historyRepository.addHistory(userId, query, photos);
        return history;
    }
}
