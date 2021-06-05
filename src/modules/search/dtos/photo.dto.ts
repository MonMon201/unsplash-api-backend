import { Photo } from '../entities/photo';

export class PhotoDto {
    id!: string;
    url!: string;
    like!: boolean;

    static from(photo: Photo, like: boolean) {
        const dto = new PhotoDto();
        dto.id = photo.id;
        dto.url = photo.urls.regular;
        dto.like = like;
        return dto;
    }
}
