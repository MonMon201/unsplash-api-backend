import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { UserService } from '../user/user.service';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [DbModule],
  controllers: [HistoryController],
  providers: [HistoryService, DbService, UserService]
})
export class HistoryModule {}
