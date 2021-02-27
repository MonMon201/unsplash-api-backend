import { Injectable } from '@nestjs/common';
import { DataStore } from 'notarealdb';
import { User } from './models/user.type';
import { HistoryRepository } from './repositories/history.repository';
import { UserRepository } from './repositories/user.repository';
import { History } from './models/history.type';

@Injectable()
export class DbService {
    private readonly store: DataStore = new DataStore('./store');
    private userRepository: UserRepository = new UserRepository(this.store.collection<User>('users'));
    private historyRepository: HistoryRepository = new HistoryRepository(this.store.collection<History>('history'));
    constructor() {}

    getUserRepository() {
        return this.userRepository;
    }

    getHistoryRepository() {
        return this.historyRepository;
    }
}
