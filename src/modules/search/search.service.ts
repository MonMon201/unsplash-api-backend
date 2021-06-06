import { Injectable } from '@nestjs/common';
import { UnsplashService } from '../unsplash/unsplash.service';
import { Photo } from './entities/photo';
import { HistoryService } from '../history/history.service';
import { UserService } from '../user/user.service';
import { SearchResult } from './entities/searchResult';
import { History } from 'src/db/models/history.entity';

@Injectable()
export class SearchService {
    constructor(
        private readonly unsplashService: UnsplashService,
        private readonly historyService: HistoryService,
        private readonly userService: UserService,
    ) {}

    async searchPhotos(userId: string, query: string): Promise<SearchResult> {
        const history = await this.searchPhotosInHistory(userId);
        if (history && history.photos.length > 0) {
            return {
                isSuccess: history.photos.length > 0,
                photos: history.photos,
            };
        }
        const payload = await this.unsplashService.getPhotos(query);
        payload.response.results;
        if (payload.type === 'error') {
            console.log(
                `Errors have occured: \n ${payload.errors} \n status: ${payload.status}`,
            );
            return {
                isSuccess: payload.errors.length === 0,
                error: {
                    code: payload.status,
                    messages: payload.errors,
                },
            };
        }
        const photos = payload.response.results.map((photo) => {
            return {
                id: photo.id,
                urls: {
                    regular: photo.urls.regular,
                },
            };
        });
        const newHistory = await this.addPhotosToHistory(userId, query, photos);
        return {
            isSuccess: newHistory.photos.length > 0,
            photos: newHistory.photos,
        };
    }

    async searchPhotosInHistory(query: string): Promise<History> {
        return this.historyService.getHistoryByQuery(query);
    }

    async addPhotosToHistory(userId: string, query: string, photos: Photo[]) {
        const user = await this.userService.getUserByid(userId);
        const history = await this.historyService.addHistory(
            user,
            query,
            photos,
        );
        return history;
    }
}
