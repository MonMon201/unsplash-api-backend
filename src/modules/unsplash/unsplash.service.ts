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
        const maximumImagesPerPage = 30;
        return this.getApi().search.getPhotos({
            query,
            perPage: maximumImagesPerPage,
        });
    }
}
