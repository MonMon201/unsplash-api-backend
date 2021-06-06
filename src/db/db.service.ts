import { Injectable } from '@nestjs/common';
import { DataStore } from 'notarealdb';
import { User } from './models/user.entity';
import { HistoryRepository } from './repositories/history.repository';
import { UserRepository } from './repositories/user.repository';
import { History } from './models/history.entity';
import { LikeRepository } from './repositories/like.repository';
import { Like } from './models/like.entity';

@Injectable()
export class DbService {
    private readonly store: DataStore = new DataStore('./store');
    private readonly userRepository: UserRepository = new UserRepository(
        this.store.collection<User>('users'),
    );
    private readonly historyRepository: HistoryRepository = new HistoryRepository(
        this.store.collection<History>('history'),
    );
    private readonly likeRepository: LikeRepository = new LikeRepository(
        this.store.collection<Like>('like'),
    );

    getUserRepository() {
        return this.userRepository;
    }

    getHistoryRepository() {
        return this.historyRepository;
    }

    getLikeRepository() {
        return this.likeRepository;
    }
}
