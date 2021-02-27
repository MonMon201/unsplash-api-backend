import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserGuestValidationService } from '../user/validation-service/user-guest-validation.service';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
    imports: [DbModule, UserModule],
    controllers: [HistoryController],
    providers: [HistoryService, DbService, UserService, UserGuestValidationService],
})
export class HistoryModule {}
