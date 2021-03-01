import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
    imports: [DbModule],
    controllers: [LikeController],
    providers: [LikeService, DbService],
})
export class LikeModule {}
