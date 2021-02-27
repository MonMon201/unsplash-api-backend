import { History } from '../../../db/models/history.type';

export class HistoryDto {
    id!: string;
    userId!: string;
    query!: string;

    static from(history: History) {
        const dto = new HistoryDto();
        dto.id = history.id;
        dto.id = history.id;
        dto.query = history.query;
        return dto;
    }
}