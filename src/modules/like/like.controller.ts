import { Controller, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRequest } from './dtos/like.request';
import { LikeDto } from './dtos/like.dto';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post('/addLike')
    async addLike(@Body() likeReq: LikeRequest): Promise<LikeDto> {
        const like = await this.likeService.getLikeByPhotoId(likeReq.userId, likeReq.photoId);
        if (!like) {
            throw new HttpException(`Like is already on this photo`, HttpStatus.FORBIDDEN);
        }
        const newLike = await this.likeService.addLike(likeReq.userId, likeReq.photoId);
        return LikeDto.from(newLike);
    }

    @Post('/removeLike')
    async removeLike(@Body() likeReq: LikeRequest): Promise<LikeDto> {
        const like = await this.likeService.getLikeByPhotoId(likeReq.userId, likeReq.photoId);
        if (!like) {
            throw new HttpException(`No like on this photo`, HttpStatus.FORBIDDEN);
        }
        await this.likeService.removeLike(like.id);
        return LikeDto.from(like);
    }
}
