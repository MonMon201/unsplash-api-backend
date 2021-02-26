import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { UnsplashModule } from '../../unsplash/unsplash.module';
import { DbService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';

@Module({
    imports: [UnsplashModule, DbModule],
    controllers: [SearchController],
    providers: [SearchService, DbService],
})
export class SearchModule {}
