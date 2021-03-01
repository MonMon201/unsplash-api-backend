import { Controller, Get, Param } from '@nestjs/common';
import { HistoryDto } from './dtos/history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private historyService: HistoryService) {}

    @Get('/:userId')
    async getHistory(@Param('userId') userId: string): Promise<HistoryDto[]> {
        const histories = await this.historyService.getUsersHistoriesByUsersId(userId);
        const dtos = histories.map((history) => HistoryDto.from(history));
        return dtos;
    }
}
