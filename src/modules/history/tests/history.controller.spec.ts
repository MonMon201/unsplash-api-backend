import { DbService } from '../../../db/db.service';
import { History } from '../../../db/models/history.entity';
import { AuthDto } from '../../auth/dtos/auth.dto';
import { UserService } from '../../user/user.service';
import { HistoryDto } from '../dtos/history.dto';
import { HistoryController } from '../history.controller';
import { HistoryService } from '../history.service';

describe('History Controller', () => {
    let dbService: DbService;
    let historyService: HistoryService;
    let userService: UserService;
    let historyController: HistoryController;
    const mockedUser: AuthDto = {
        id: '',
        username: '',
    };
    const mock: History[] = [
        {
            id: '',
            query: '',
            photos: [],
            username: '',
            userId: '',
        },
    ];
    const mockedResponse: HistoryDto[] = [
        {
            id: '',
            query: '',
            username: '',
            userId: '',
        },
    ];
    const mockGetUserByid = async (id: string) => mockedUser;
    const mockGetUserByidEmpty = async (id: string) => undefined;
    const mockGetUsersHistoriesByUsersId = async (id: string) => mock;
    beforeEach(() => {
        dbService = new DbService();
        historyService = new HistoryService(dbService);
        userService = new UserService(dbService);
        historyController = new HistoryController(historyService, userService);
    });
    it('Should get history of a user', async () => {
        jest.spyOn(userService, 'getUserByid').mockImplementation(
            mockGetUserByid,
        );
        jest.spyOn(
            historyService,
            'getUsersHistoriesByUsersId',
        ).mockImplementation(mockGetUsersHistoriesByUsersId);
        const history = await historyController.getHistory(mockedUser);
        expect(history).toEqual(mockedResponse);
    });
    it(`Should throw "Forbidden" error`, async () => {
        jest.spyOn(userService, 'getUserByid').mockImplementation(
            mockGetUserByidEmpty,
        );
        try {
            await historyController.getHistory(mockedUser);
        } catch (e) {
            expect(e.message).toEqual(
                `User with id ${mockedUser.id} does not exist`,
            );
        }
    });
});
