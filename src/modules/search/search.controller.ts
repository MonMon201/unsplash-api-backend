import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PhotoDto } from './dtos/photo.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { SearchService } from './search.service';
import { UserGuestValidationService } from '../user/validation-service/user-guest-validation.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService, private userGuestValidationService: UserGuestValidationService) {}

    @Post('/:userId')
    async searchItem(@Param('userId') userId: string, @Body() searchReq: SearchQueryDto): Promise<PhotoDto[]> {
        console.log(searchReq, userId);
        const photos = await this.searchService.search(userId, searchReq.query);
        const dtos = photos.map((photo) => PhotoDto.from(photo));
        return dtos;
    }
}
