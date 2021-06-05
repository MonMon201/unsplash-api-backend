import { Injectable } from '@nestjs/common';
import { Collection } from 'notarealdb';
import { Like } from '../models/like.entity';

@Injectable()
export class LikeRepository {
    constructor(private likeCollection: Collection<Like>) {}

    async addLike(userId: string, photoId: string): Promise<Like> {
        const likeId = this.likeCollection.create({ userId, photoId });
        return this.likeCollection.get(likeId);
    }

    async removeLike(likeId: string): Promise<void> {
        this.likeCollection.delete(likeId);
    }

    async getLikesByUserId(userId: string): Promise<Like[]> {
        return this.likeCollection.list().filter((like) => like.userId === userId);
    }

    async getLikeByPhotoId(photoId: string): Promise<Like[]> {
        return this.likeCollection.list().filter((like) => like.photoId === photoId);
    }
}
