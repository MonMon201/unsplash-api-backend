import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { createApi } from 'unsplash-js';

@Injectable()
export class UnsplashService {
    getApi() {
        return createApi({
            accessKey: process.env.ACCESS_KEY || '',
            fetch,
        });
    }

    async getPhotos(query: string) {
        const photos = await this.getApi().search.getPhotos({
            query,
            perPage: 30,
        });
        return photos;
    }
}
