import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { History } from 'src/db/models/history.entity';
import { User } from 'src/db/models/user.entity';
import { HistoryRepository } from 'src/db/repositories/history.repository';
import { Photo } from '../search/entities/photo';

@Injectable()
export class HistoryService {
    private historyRepository: HistoryRepository;

    constructor(private dbService: DbService) {
        this.historyRepository = this.dbService.getHistoryRepository();
    }

    async getUsersHistoriesByUsersId(userId: string): Promise<History[]> {
        return this.historyRepository.getUsersHistoriesByUsersId(userId);
    }

    async getHistoryByQuery(query: string): Promise<History> {
        const usersHistories = await this.historyRepository.getAllHistory();
        return usersHistories.find((history) => history.query === query);
    }

    async addHistory(user: User, query: string, photos: Photo[]) {
        return this.historyRepository.addHistory(user, query, photos);
    }
}
