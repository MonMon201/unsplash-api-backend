import { Controller, Param, Body, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRequest } from './dtos/like.request';
import { LikeDto } from './dtos/like.dto';

@Controller('like')
export class LikeController {
    constructor(private likeService: LikeService) {}

    @Post('/:userId')
    async addLike(@Param('userId') userId: string, @Body() likeReq: LikeRequest): Promise<LikeDto> {
        const like = await this.likeService.addLike(userId, likeReq.photoId);
        return LikeDto.from(like);
    }

    @Post('/:userId')
    async removeLike(@Param('userId') userId: string, @Body() likeReq: LikeRequest): Promise<LikeDto> {
        const like = await this.likeService.getLikeByPhotoId(userId, likeReq.photoId);
        await this.likeService.removeLike(like.id);
        return LikeDto.from(like);
    }
}
