import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { Like } from '../../db/models/like.entity';
import { LikeRepository } from 'src/db/repositories/like.repository';

@Injectable()
export class LikeService {
    private likeRepository: LikeRepository;

    constructor(private dbService: DbService) {
        this.likeRepository = this.dbService.getLikeRepository();
    }

    async addLike(userId: string, photoId: string): Promise<Like> {
        return this.likeRepository.addLike(userId, photoId);
    }

    async removeLike(likeId: string): Promise<void> {
        await this.likeRepository.removeLike(likeId);
    }

    async getLikesByUserId(userId: string): Promise<Like[]> {
        return this.likeRepository.getLikesByUserId(userId);
    }

    async getLikeByPhotoId(userId: string, photoId: string): Promise<Like> {
        const likes = await this.likeRepository.getLikeByPhotoId(photoId);
        return likes.find((like) => like.userId === userId);
    }
}
