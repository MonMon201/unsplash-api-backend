import { HttpException, Injectable } from '@nestjs/common';
import { UnsplashService } from '../unsplash/unsplash.service';
import { Photo } from './entities/photo';
import { HistoryService } from '../history/history.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SearchService {
    constructor(
        private unsplashService: UnsplashService,
        private historyService: HistoryService,
        private userService: UserService,
    ) {}

    async searchPhotos(userId: string, query: string): Promise<Photo[]> {
        if (!query.length)
        throw new HttpException(`Request is empty`, 400);
        
        const history = await this.historyService.getHistoryByQuery(query);
        return history ? this.addPhotosToHistory(userId, query, history.photos) : this.searchNewPhotos(userId, query);
    }

    async searchNewPhotos(userId: string, query: string): Promise<Photo[]> {
        const payload = await this.unsplashService.getPhotos(query);
        const photos = payload.response.results.map((photo) => {
            return {
                id: photo.id,
                urls: {
                    regular: photo.urls.regular,
                },
            };
        });
        return this.addPhotosToHistory(userId, query, photos);
    }

    async addPhotosToHistory(userId: string, query: string, photos: Photo[]) {
        const user = await this.userService.getUserByid(userId);
        const history = await this.historyService.addHistory(user, query, photos);
        return history.photos;
    }
}
