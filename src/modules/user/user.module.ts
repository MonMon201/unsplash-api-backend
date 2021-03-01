import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { UserService } from './user.service';

@Module({
    imports: [DbModule],
    controllers: [],
    providers: [UserService, DbService],
})
export class UserModule {}
