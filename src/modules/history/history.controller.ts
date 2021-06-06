import { Body, Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthDto } from '../auth/dtos/auth.dto';
import { UserService } from '../user/user.service';
import { HistoryDto } from './dtos/history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService, private readonly userService: UserService) {}

    @Get('/')
    async getHistory(@Body() authReq: AuthDto): Promise<HistoryDto[]> {
        const { id } = authReq;
        const user = await this.userService.getUserByid(id);
        if (!user) {
            throw new HttpException(`User with id ${id} does not exist`, HttpStatus.FORBIDDEN);
        }
        const histories = await this.historyService.getUsersHistoriesByUsersId(
            id,
        );
        const dtos = histories.map((history) => HistoryDto.from(history));
        return dtos;
    }
}
