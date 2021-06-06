import { Body, Controller, Get } from '@nestjs/common';
import { AuthDto } from '../auth/dtos/auth.dto';
import { HistoryDto } from './dtos/history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get('/')
    async getHistory(@Body() authReq: AuthDto): Promise<HistoryDto[]> {
        const { id } = authReq;
        const histories = await this.historyService.getUsersHistoriesByUsersId(
            id,
        );
        const dtos = histories.map((history) => HistoryDto.from(history));
        return dtos;
    }
}
