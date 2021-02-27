import { Injectable } from '@nestjs/common';
import { Collection } from 'notarealdb';
import { User } from '../models/user.type';

@Injectable()
export class UserRepository {
    constructor(private userCollection: Collection<User>) {}

    async addUser(username: string): Promise<User> {
        const id = this.userCollection.create({ username });
        return this.userCollection.get(id);
    }

    async getUserByid(userId: string): Promise<User> {
        return this.userCollection.get(userId);
    }

    async getUserByUsername(username: string): Promise<User> {
        return this.userCollection.list().filter((user) => user.username === username)[0];
    }

    async exists(id: string): Promise<User> {
        return await this.userCollection.get(id);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userCollection.list();
    }
}
