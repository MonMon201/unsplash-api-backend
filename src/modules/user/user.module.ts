import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserGuestValidationService } from './validation-service/user-guest-validation.service';

@Module({
    imports: [DbModule],
    controllers: [UserController],
    providers: [UserService, DbService, UserGuestValidationService],
})
export class UserModule {}
