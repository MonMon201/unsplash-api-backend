import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { UnsplashModule } from '../unsplash/unsplash.module';
import { DbService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';
import { HistoryService } from '../history/history.service';
import { HistoryModule } from '../history/history.module';
import { UserService } from '../user/user.service';
import { LikeService } from '../like/like.service';
import { LikeModule } from '../like/like.module';

@Module({
    imports: [UnsplashModule, DbModule, HistoryModule, LikeModule],
    controllers: [SearchController],
    providers: [SearchService, DbService, HistoryService, UserService, LikeService],
})
export class SearchModule {}
