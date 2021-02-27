import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { HistoryRepository } from 'src/db/repositories/history.repository';
import { UnsplashService } from '../../unsplash/unsplash.service';
import { Photo } from './types/photo';
import { HistoryService } from '../history/history.service';

@Injectable()
export class SearchService {
    constructor(private unsplashService: UnsplashService, private historyService: HistoryService) {}

    async search(userId: string, query: string): Promise<Photo[]> {
        if(query.length){
            const history = await this.historyService.getHistoryByQuery(query);
            if (history) {
                console.log('Loaded from db');
                return history.photos;
            } else{
                const payload = await this.unsplashService.getPhotos(query);
                const photos = payload.response.results.map((photo) => {
                    return {
                        id: photo.id,
                        urls: {
                            regular: photo.urls.regular,
                        },
                    };
                });
                await this.historyService.addHistory(userId, query, photos);
                return photos;
            }
        } else {
            throw new BadRequestException(`Request is empty`)
        }
    }
}
