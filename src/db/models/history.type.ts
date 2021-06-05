import { Photo } from 'src/modules/search/entities/photo';

export interface History {
    id: string;
    query: string;
    photos: Photo[];
    username: string;
    userId: string;
}
