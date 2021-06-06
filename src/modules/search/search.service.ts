import { Injectable } from '@nestjs/common';
import { UnsplashService } from '../unsplash/unsplash.service';
import { Photo } from './entities/photo';
import { HistoryService } from '../history/history.service';
import { UserService } from '../user/user.service';
import { SearchResult } from './entities/searchResult';

@Injectable()
export class SearchService {
    constructor(
        private readonly unsplashService: UnsplashService,
        private readonly historyService: HistoryService,
        private readonly userService: UserService,
    ) {}

    async searchPhotos(userId: string, query: string): Promise<SearchResult> {
        const photosFromHistory = await this.searchPhotosInHistory(
            userId,
            query,
        );
        if (photosFromHistory.length > 0) {
            return {
                isSuccess: photosFromHistory.length > 0,
                photos: photosFromHistory,
            };
        }

        const payload = await this.unsplashService.getPhotos(query);

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

        return {
            isSuccess: photos.length > 0,
            photos: photos,
        };
    }

    async searchPhotosInHistory(
        userId: string,
        query: string,
    ): Promise<Photo[]> {
        const history = await this.historyService.getHistoryByQuery(query);
        return history
            ? this.addPhotosToHistory(userId, query, history.photos)
            : [];
    }

    async addPhotosToHistory(userId: string, query: string, photos: Photo[]) {
        const user = await this.userService.getUserByid(userId);
        const history = await this.historyService.addHistory(
            user,
            query,
            photos,
        );
        return history.photos;
    }
}
