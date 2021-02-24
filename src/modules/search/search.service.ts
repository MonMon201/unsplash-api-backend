import { Injectable } from '@nestjs/common';
import { UnsplashService } from '../../unsplash/unsplash.service';

@Injectable()
export class SearchService {
    constructor(private unsplashService: UnsplashService) {}
    async search(item: string) {
        const payload = await this.unsplashService.getPhotos(item);
        return payload;
    }
}
