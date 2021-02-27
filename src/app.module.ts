import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { SearchModule } from './modules/search/search.module';
import { UserModule } from './modules/user/user.module';
import { UnsplashModule } from './unsplash/unsplash.module';
import { AuthModule } from './modules/auth/auth.module';
import { HistoryModule } from './modules/history/history.module';

@Module({
    imports: [SearchModule, UnsplashModule, UserModule, DbModule, AuthModule, HistoryModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
