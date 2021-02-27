import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { UnsplashModule } from '../../unsplash/unsplash.module';
import { DbService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';
import { HistoryService } from '../history/history.service';
import { HistoryModule } from '../history/history.module';
import { UserService } from '../user/user.service';
import { UserGuestValidationService } from '../user/validation-service/user-guest-validation.service';

@Module({
    imports: [UnsplashModule, DbModule, HistoryModule],
    controllers: [SearchController],
    providers: [SearchService, DbService, HistoryService, UserService, UserGuestValidationService],
})
export class SearchModule {}
