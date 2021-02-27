import { Photo } from 'src/modules/search/types/photo';

export interface History {
    id: string;
    userId: string;
    query: string;
    photos: Photo[];
}
