import { Controller, Get, Param, Body } from '@nestjs/common';
import { PhotoDto } from './dtos/photo.dto';
import { SearchReqDto } from './dtos/search.request.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('/')
    async searchItem(@Body() searchReq: SearchReqDto): Promise<PhotoDto[]> {
        const photos = await this.searchService.search(searchReq.userId, searchReq.query);
        const dtos = photos.response.results.map((photo) => PhotoDto.from(photo));
        console.log(dtos);
        return dtos;
    }
}
