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
        const mock: History[] = [
            {
                id: '',
                query: '',
                photos: [],
                username: '',
                userId: '',
            },
        ];
        historyRepository.getUsersHistoriesByUsersId = async (userId: string) =>
            mock;
        const histories = await historyService.getUsersHistoriesByUsersId('id');
        expect(histories).toEqual(mock);
    });

    it(`Should find user's history by user's query`, async () => {
        const query = 'query';
        const mock: History[] = [
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
        historyRepository.getAllHistory = async () => mock;
        const history = await historyService.getHistoryByQuery(query);
        expect(history).toEqual(mock[0]);
    });

    it(`Should add user's history`, async () => {
        const mockedUser: User = {
            id: '',
            username: '',
        };
        const mock: History = {
            id: '',
            query: '',
            photos: [],
            username: '',
            userId: '',
        };
        historyRepository.addHistory = async (user, query, photos) => mock;
        const history = await historyService.addHistory(
            mockedUser,
            mock.query,
            mock.photos,
        );
        expect(history).toEqual(mock);
    });
});
