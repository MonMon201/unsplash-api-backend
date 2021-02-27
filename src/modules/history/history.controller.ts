import { Controller, Get, Post, Param } from '@nestjs/common';
import { HistoryDto } from './dtos/history.dto';
import { HistoryService } from './history.service';
import { UserGuestValidationService } from '../user/validation-service/user-guest-validation.service';

@Controller('history')
export class HistoryController {
    constructor(
        private historyService: HistoryService,
        private userGuestValidationService: UserGuestValidationService,
    ) {}

    @Get('/:userId')
    async getHistory(@Param('userId') userId: string): Promise<HistoryDto[]> {
        const histories = await this.historyService.getHistoryByid(userId);
        const dtos = histories.map((history) => HistoryDto.from(history));
        return dtos;
    }

    @Post('/:userId')
    async addHistory(@Param('userId') userId: string) {
        const user = await this.userGuestValidationService.guestCheck(userId);
    }
}
