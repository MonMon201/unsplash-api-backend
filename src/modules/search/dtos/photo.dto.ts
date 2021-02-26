import { Photo } from '../types/photo.type';

export class PhotoDto {
    id!: string;
    url!: string;

    static from(photo: Photo) {
        const dto = new PhotoDto();
        dto.id = photo.id;
        dto.url = photo.urls.regular;
        return dto;
    }
}
