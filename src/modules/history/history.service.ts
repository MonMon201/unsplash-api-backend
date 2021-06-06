import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { History } from '../../db/models/history.entity';
import { User } from '../../db/models/user.entity';
import { HistoryRepository } from '../../db/repositories/history.repository';
import { Photo } from '../search/entities/photo';

@Injectable()
export class HistoryService {
    private historyRepository: HistoryRepository;

    constructor(private readonly dbService: DbService) {
        this.historyRepository = this.dbService.getHistoryRepository();
    }

    async getUsersHistoriesByUsersId(userId: string): Promise<History[]> {
        return this.historyRepository.getUsersHistoriesByUsersId(userId);
    }

    async getHistoryByQuery(query: string): Promise<History> {
        const usersHistories = await this.historyRepository.getAllHistory();
        const searchHistory = (h: History) => h.query === query;
        return usersHistories.find(searchHistory);
    }

    async addHistory(user: User, query: string, photos: Photo[]) {
        return this.historyRepository.addHistory(user, query, photos);
    }
}
