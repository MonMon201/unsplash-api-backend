import { HistoryService } from '../../history/history.service';
import { UnsplashService } from '../../unsplash/unsplash.service';
import { UserService } from '../../user/user.service';
import { DbService } from '../../../db/db.service';
import { SearchService } from '../search.service';
import { Photo } from '../entities/photo';
import { User } from 'src/db/models/user.entity';
import { History } from 'src/db/models/history.entity';

describe('Like Service', () => {
    let dbService: DbService;
    let unsplashService: UnsplashService;
    let userService: UserService;
    let historyService: HistoryService;
    let searchService: SearchService;
    const mockedUserId = 'mockid';
    const mockedQuery = 'mockrequest';
    const mockedPhotos: Photo[] = [
        {
            id: 'mockid',
            urls: {
                regular: 'mockRegularUrl',
            },
        },
    ];
    const mockedUser: User = {
        id: mockedUserId,
        username: 'mockusername',
    };
    const mockedHistory: History = {
        id: 'mockid',
        query: mockedQuery,
        photos: mockedPhotos,
        username: mockedUser.username,
        userId: mockedUser.id,
    };

    const mockGetUserByid = async (userId: string) => mockedUser;
    const mockAddToHistory = async (
        user: User,
        query: string,
        photos: Photo[],
    ) => {
        const { id, username } = user;
        return {
            id: 'mockid',
            query,
            photos,
            userId: id,
            username,
        };
    };
    const mockedGetHistoryByQuery = async (query: string) => mockedHistory;

    beforeAll(() => {
        dbService = new DbService();
        historyService = new HistoryService(dbService);
        unsplashService = new UnsplashService();
        userService = new UserService(dbService);
        searchService = new SearchService(
            unsplashService,
            historyService,
            userService,
        );
    });

    describe('addPhotosToHistory method', () => {
        it(`Should add photos to history`, async () => {
            jest.spyOn(userService, 'getUserByid').mockImplementation(
                mockGetUserByid,
            );
            jest.spyOn(historyService, 'addHistory').mockImplementation(
                mockAddToHistory,
            );
            const history = await searchService.addPhotosToHistory(
                mockedUserId,
                mockedQuery,
                mockedPhotos,
            );
            expect(history).toEqual(mockedHistory);
        });
    });

    describe('searchPhotosInHistory method', () => {
        it(`Should search for photos in history`, async () => {
            jest.spyOn(historyService, 'getHistoryByQuery').mockImplementation(
                mockedGetHistoryByQuery,
            );
            const history = await searchService.searchPhotosInHistory(
                mockedUserId,
            );
            expect(history).toEqual(mockedHistory);
        });
    });
});
