import { Controller, Param, Body, Post } from '@nestjs/common';
import { LikeService } from '../like/like.service';
import { PhotoDto } from './dtos/photo.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService, private likeService: LikeService) {}

    @Post('/:userId')
    async searchItem(@Param('userId') userId: string, @Body() searchReq: SearchQueryDto): Promise<PhotoDto[]> {
        const photos = await this.searchService.searchPhotos(userId, searchReq.query);
        const likes = await this.likeService.getLikesByUserId(userId);
        const dtos = photos.map((photo) => PhotoDto.from(photo, !!(likes.filter((like) => like.photoId === photo.id)[0])))
        return dtos;
    }
}
