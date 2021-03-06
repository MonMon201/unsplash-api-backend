import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Like } from 'src/db/models/like.type';
import { LikeRepository } from 'src/db/repositories/like.repository';

@Injectable()
export class LikeService {
    private likeRepository: LikeRepository;

    constructor(private dbService: DbService) {
        this.likeRepository = this.dbService.getLikeRepository();
    }

    async addLike(userId: string, photoId: string): Promise<Like> {
        const like = await this.likeRepository.addLike(userId, photoId);
        return like;
    }

    async removeLike(likeId: string): Promise<void> {
        await this.likeRepository.removeLike(likeId);
    }

    async getLikesByUserId(userId: string): Promise<Like[]> {
        return this.likeRepository.getLikesByUserId(userId);
    }

    async getLikeByPhotoId(userId: string, photoId: string): Promise<Like> {
        const likes = await this.likeRepository.getLikeByPhotoId(photoId);
        const like = likes.filter((like) => like.userId === userId)[0];
        return like;
    }
}
