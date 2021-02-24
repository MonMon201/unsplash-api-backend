import { Injectable } from '@nestjs/common';
import { DataStore } from 'notarealdb';
import { User } from './models/user.type'
import { UserRepository } from './repositories/user.repository';


@Injectable()
export class DbService {
    private readonly store: DataStore = new DataStore('./store');
    private readonly userRepository: UserRepository = new UserRepository(this.store.collection<User>('users'))

    constructor() {}
    
    getUserRepository(){
        return this.userRepository;
    }
}