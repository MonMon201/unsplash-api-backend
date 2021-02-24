import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('/:item')
  async findAll(@Param('item') item: string): Promise<any> {
    const photos = await this.searchService.search(item);
    return {
      res: `Here is response for ${item}`,
      photos,
    };
  }
}
