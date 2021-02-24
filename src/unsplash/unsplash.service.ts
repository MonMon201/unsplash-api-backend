import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { createApi } from 'unsplash-js';

@Injectable()
export class UnsplashService {
    constructor(){}
    
    getApi() {
        return createApi({
            accessKey: process.env.ACCESS_KEY,
            fetch,
        })
    }

    async getPhotos(query: string) {
        return this.getApi().search.getPhotos({
            query,
        })
    }
}