import { Collection, DataStore } from 'notarealdb';
import { HistoryRepository } from '../../../db/repositories/history.repository';
import { History } from '../../../db/models/history.entity';
import { HistoryService } from '../history.service';
import { DbService } from '../../../db/db.service';
import { User } from 'src/db/models/user.entity';

describe('History Service', () => {
    let store: DataStore;
    let collection: Collection<History>;
    let historyRepository: HistoryRepository;
    let dbService: DbService;
    let historyService: HistoryService;
    const query = 'query';
    const mockHistories: History[] = [
        {
            id: '',
            query,
            photos: [],
            username: '',
            userId: '',
        },
        {
            id: '',
            query: '',
            photos: [],
            username: '',
            userId: '',
        },
    ];
    const mockHistory: History = {
        id: '',
        query: '',
        photos: [],
        username: '',
        userId: '',
    };
    const mockedUser: User = {
        id: '',
        username: '',
    };
    const mockGetUsersHistoriesByUsersId = async (userId: string) => mockHistories;
    const mockGetAllHistory = async () => mockHistories;
    const mockAddHistory = async (user, query, photos) => mockHistory;

    beforeAll(() => {
        store = new DataStore('./store');
        collection = store.collection<History>('');
        historyRepository = new HistoryRepository(collection);
    });
    beforeEach(() => {
        dbService = new DbService();
        jest.spyOn(dbService, 'getHistoryRepository').mockImplementation(
            () => historyRepository,
        );
        historyService = new HistoryService(dbService);
    });
    it(`Should find user's histories by user's id`, async () => {
        historyRepository.getUsersHistoriesByUsersId = mockGetUsersHistoriesByUsersId;
        const histories = await historyService.getUsersHistoriesByUsersId('id');
        expect(histories).toEqual(mockHistories);
    });

    it(`Should find user's history by user's query`, async () => {
        historyRepository.getAllHistory = mockGetAllHistory;
        const history = await historyService.getHistoryByQuery(query);
        expect(history).toEqual(mockHistories[0]);
    });

    it(`Should add user's history`, async () => {
        historyRepository.addHistory = mockAddHistory;
        const history = await historyService.addHistory(
            mockedUser,
            mockHistory.query,
            mockHistory.photos,
        );
        expect(history).toEqual(mockHistory);
    });
});
