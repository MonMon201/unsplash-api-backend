import { Controller, Body, Post } from '@nestjs/common';
import { LikeService } from '../like/like.service';
import { PhotoDto } from './dtos/photo.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService, private likeService: LikeService) {}

    @Post('/')
    async searchItem(@Body() searchReq: SearchQueryDto): Promise<PhotoDto[]> {
        const photos = await this.searchService.searchPhotos(searchReq.userId, searchReq.query);
        const likes = await this.likeService.getLikesByUserId(searchReq.userId);
        const dtos = photos.map((photo) => PhotoDto.from(photo, !!likes.find((like) => like.photoId === photo.id)));
        return dtos;
    }
}
