import { Injectable } from '@nestjs/common';
import { Collection } from 'notarealdb';
import { User } from '../models/user.type';

@Injectable()
export class UserRepository {
    constructor(private userCollection: Collection<User>) {}

    addUser(username: string): User {
        const userId = this.userCollection.create({ username });
        return this.userCollection.get(userId);
    }

    exists(username: string): boolean {
        return !!this.userCollection.list().filter((user) => user.username === username);
    }

    getAllUsers(): User[] {
        return this.userCollection.list();
    }
}
