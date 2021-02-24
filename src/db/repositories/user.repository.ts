import { Injectable } from '@nestjs/common';
import { Collection, DataStore } from 'notarealdb';
import { User } from '../models/user.type';

@Injectable()
export class UserRepository {
  constructor(private userCollection: Collection<User>) {}

  addUser(username: string): string {
    const userId = this.userCollection.create({ username });
    return this.userCollection.get(userId).username;
  }

  exists(username: string): boolean {
    return !!this.userCollection.list().filter((user) => user.username === username);
  }
}
