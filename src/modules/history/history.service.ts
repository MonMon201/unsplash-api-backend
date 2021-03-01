import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { History } from 'src/db/models/history.type';
import { User } from 'src/db/models/user.type';
import { HistoryRepository } from 'src/db/repositories/history.repository';
import { Photo } from '../search/types/photo';

@Injectable()
export class HistoryService {
    private historyRepository: HistoryRepository;

    constructor(private dbService: DbService) {
        this.historyRepository = this.dbService.getHistoryRepository();
    }

    async getUsersHistoriesByUsersId(userId: string): Promise<History[]> {
        if (await this.historyRepository.exists(userId)) {
            return this.historyRepository.getUsersHistoriesByUsersId(userId);
        } else {
            return [];
        }
    }

    async getHistoryByQuery(query: string): Promise<History> {
        const usersHistories = await this.historyRepository.getAllHistory();
        return usersHistories.filter((history) => history.query === query)[0];
    }

    async addHistory(user: User, query: string, photos: Photo[]) {
        const history = await this.historyRepository.addHistory(user, query, photos);
        return history;
    }
}
