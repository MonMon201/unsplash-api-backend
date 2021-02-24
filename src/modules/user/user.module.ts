import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [DbModule],
    controllers: [UserController],
    providers: [UserService, DbService],
})
export class UserModule {}
