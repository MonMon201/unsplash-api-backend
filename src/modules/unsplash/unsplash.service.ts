import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import { promises } from 'fs';

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
        const response = await this.getApi().search.getPhotos({
            query,
            perPage: maximumImagesPerPage,
        });
        return response;
    }
}
