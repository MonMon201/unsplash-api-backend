import { Photo } from 'src/modules/search/types/photo';

export interface History {
    id: string;
    query: string;
    photos: Photo[];
    username: string;
    userId: string;
}
