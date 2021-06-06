// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });
    await app.listen(3001);
})();
