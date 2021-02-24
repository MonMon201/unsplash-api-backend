import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { UnsplashModule } from '../../unsplash/unsplash.module';

@Module({
  imports: [UnsplashModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
