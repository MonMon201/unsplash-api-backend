import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [DbModule, UserModule],
    providers: [AuthService, DbService, UserService],
    controllers: [AuthController],
})
export class AuthModule {}
