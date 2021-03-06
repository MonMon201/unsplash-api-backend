import { Injectable } from '@nestjs/common';
import { Collection } from 'notarealdb';
import { Photo } from 'src/modules/search/types/photo';
import { History } from '../models/history.type';
import { User } from '../models/user.type';

@Injectable()
export class HistoryRepository {
    constructor(private historyCollection: Collection<History>) {}

    async addHistory(user: User, query: string, photos: Photo[]): Promise<History> {
        const historyId = this.historyCollection.create({ userId: user.id, username: user.username, query, photos });
        return this.historyCollection.get(historyId);
    }

    async getHistoryById(historyId: string): Promise<History> {
        return await this.historyCollection.get(historyId);
    }

    async getUsersHistoriesByUsersId(userId: string): Promise<History[]> {
        return this.historyCollection.list().filter((history) => history.userId === userId);
    }

    async exists(userId: string): Promise<boolean> {
        return !!(await this.getUsersHistoriesByUsersId(userId))[0];
    }

    async getAllHistory(): Promise<History[]> {
        return await this.historyCollection.list();
    }
}
