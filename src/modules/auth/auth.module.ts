import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [DbModule],
    providers: [AuthService, DbService],
    controllers: [AuthController],
})
export class AuthModule {}
