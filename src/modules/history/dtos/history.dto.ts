import { History } from '../../../db/models/history.type';

export class HistoryDto {
    id!: string;
    query!: string;
    userId!: string;
    username!: string;

    static from(history: History) {
        const dto = new HistoryDto();
        dto.id = history.id;
        dto.query = history.query;
        dto.userId = history.userId;
        dto.username = history.username;
        return dto;
    }
}
