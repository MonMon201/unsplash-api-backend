import { DbService } from '../../../db/db.service';
import { User } from '../../../db/models/user.entity';
import { HistoryService } from '../../history/history.service';
import { LikeService } from '../../like/like.service';
import { UnsplashService } from '../../unsplash/unsplash.service';
import { UserService } from '../../user/user.service';
import { SearchQueryDto } from '../dtos/search.query.dto';
import { SearchResult } from '../entities/searchResult';
import { SearchController } from '../search.controller';
import { SearchService } from '../search.service';

describe('Search Controller', () => {
    let dbService: DbService;
    let searchService: SearchService;
    let likeService: LikeService;
    let userService: UserService;
    let unsplashService: UnsplashService;
    let historyService: HistoryService;
    let searchController: SearchController;
    const mockedUserId = 'mockedId';
    const mockedUserName = 'mockedUsername';
    const mockedQuery = 'mockedQuery';
    const mockedQueryEmpty = '';
    const mockedUser: User = {
        id: mockedUserId,
        username: mockedUserName,
    };
    const searchRequest: SearchQueryDto = {
        userId: mockedUserId,
        query: mockedQuery,
    };
    const searchRequestEmpty: SearchQueryDto = {
        userId: mockedUserId,
        query: mockedQueryEmpty,
    };
    const mockSearchResultFailed: SearchResult = {
        isSuccess: false
    }
    beforeEach(async () => {
        dbService = new DbService();
        unsplashService = new UnsplashService();
        userService = new UserService(dbService);
        historyService = new HistoryService(dbService);
        likeService = new LikeService(dbService);
        searchService = new SearchService(
            unsplashService,
            historyService,
            userService,
        );
        searchController = new SearchController(
            searchService,
            likeService,
            userService,
        );
    });
    const mockGetUserByid = async (id: string) => mockedUser;
    const mockGetUserByidEmpty = async (id: string) => undefined;
    const mockSearchPhotos = async ( userId: string, query: string) => mockSearchResultFailed
    describe('searchItem method', () => {
        it('should throw an error if user does not exist', async () => {
            jest.spyOn(userService, 'getUserByid').mockImplementation(
                mockGetUserByidEmpty,
            );
            try {
                await searchController.searchItem(searchRequest);
            } catch (e) {
                expect(e.message).toEqual(
                    `User with id ${mockedUser.id} does not exist`,
                );
            }
        });

        it('should throw an error if query is empty', async () => {
            try {
                await searchController.searchItem(searchRequestEmpty);
            } catch (e) {
                expect(e.message).toEqual(
                    `Request is empty`,
                );
            }
        });

        it('should throw an error if search result has failed', async () => {
            jest.spyOn(userService, 'getUserByid').mockImplementation(
                mockGetUserByid,
            );
            jest.spyOn(searchService, 'searchPhotos').mockImplementation(
                mockSearchPhotos,
            );
            try {
                await searchController.searchItem(searchRequest);
            } catch (e) {
                expect(e.message).toEqual(
                    `Sorry, server error has occured`
                );
            }
        });
    });
});
