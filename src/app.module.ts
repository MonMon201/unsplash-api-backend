import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { SearchModule } from './modules/search/search.module';
import { UserModule } from './modules/user/user.module';
import { UnsplashModule } from './unsplash/unsplash.module';

@Module({
    imports: [SearchModule, UnsplashModule, UserModule, DbModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
