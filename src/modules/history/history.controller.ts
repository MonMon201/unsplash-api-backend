import { Body, Controller, Get, Param } from '@nestjs/common';
import { AuthDto } from '../auth/dtos/auth.dto';
import { HistoryDto } from './dtos/history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private historyService: HistoryService) {}

    @Get('/')
    async getHistory(@Body() authReq: AuthDto): Promise<HistoryDto[]> {
        const histories = await this.historyService.getUsersHistoriesByUsersId(authReq.id);
        const dtos = histories.map((history) => HistoryDto.from(history));
        return dtos;
    }
}
