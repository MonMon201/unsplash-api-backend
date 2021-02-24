import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SearchModule } from './modules/search/search.module'
import { UnsplashModule } from './unsplash/unsplash.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [SearchModule, UnsplashModule, DbModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
