import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SearchModule } from './modules/search/search.module';
import { UnsplashModule } from './unsplash/unsplash.module';

@Module({
  imports: [SearchModule, UnsplashModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
