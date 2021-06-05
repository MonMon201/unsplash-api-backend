import { Like } from '../../../db/models/like.entity';

export class LikeDto {
    id!: string;
    userId!: string;
    photoId!: string;

    static from(like: Like) {
        const dto = new LikeDto();
        dto.id = like.id;
        dto.photoId = like.photoId;
        dto.userId = like.userId;
        return dto;
    }
}
