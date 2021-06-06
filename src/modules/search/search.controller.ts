import {
    Controller,
    Body,
    Post,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { LikeService } from '../like/like.service';
import { UserService } from '../user/user.service';
import { PhotoDto } from './dtos/photo.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(
        private searchService: SearchService,
        private likeService: LikeService,
        private userService: UserService,
    ) {}

    @Post('/')
    async searchItem(
        @Body()
        searchReq: SearchQueryDto,
    ): Promise<PhotoDto[]> {
        const { userId, query } = searchReq;
        const user = await this.userService.getUserByid(userId);
        if (!user) {
            throw new HttpException(
                `User with id ${userId} does not exists`,
                HttpStatus.FORBIDDEN,
            );
        }
        if (query.length === 0) {
            throw new HttpException(`Request is empty`, HttpStatus.BAD_REQUEST);
        }
        const searchResult = await this.searchService.searchPhotos(
            userId,
            query,
        );
        if (!searchResult.isSuccess) {
            throw new HttpException(
                `Sorry, server error has occured`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        const { photos } = searchResult;
        const likes = await this.likeService.getLikesByUserId(userId);
        const dtos = photos.map((photo) =>
            PhotoDto.from(
                photo,
                !!likes.find((like) => like.photoId === photo.id),
            ),
        );
        return dtos;
    }
}
