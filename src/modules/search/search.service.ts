import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { HistoryRepository } from 'src/db/repositories/history.repository';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import { UnsplashService } from '../../unsplash/unsplash.service';
import { History } from '../../db/models/history.type'
import { Photo } from './types/photo.type';

@Injectable()
export class SearchService {
    private historyRepository: HistoryRepository;
    constructor(
        private unsplashService: UnsplashService,
        private dbService: DbService
        ) {
            this.historyRepository = this.dbService.getHistoryRepository();
        }

    async search(userId: string, query: string): Promise<ApiResponse<Photos>> {
        const photos = await this.unsplashService.getPhotos(query);
        const historyPhotos: Photo[] = photos.response.results.map((photo) => {
            return {
                id: photo.id,
                urls: {
                    regular: photo.urls.regular,
                },
            }
        })
        await this.historyRepository.addToHistory(userId, query, historyPhotos);
        return photos;
    }
}
