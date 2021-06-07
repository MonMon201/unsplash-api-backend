import { Collection, DataStore } from 'notarealdb';
import { DbService } from '../../../db/db.service';
import { Like } from '../../../db/models/like.entity';
import { LikeRepository } from '../../../db/repositories/like.repository';
import { LikeService } from '../like.service';

describe('Like Service', () => {
    let store: DataStore;
    let collection: Collection<Like>;
    let likeRepository: LikeRepository;
    let dbService: DbService;
    let likeService: LikeService;
    const userId = 'userId';
    const photoId = 'photoId';
    const mockLike: Like = {
        id: '',
        userId: '',
        photoId: '',
    };
    const mockLikes: Like[] = [
        {
            id: '',
            userId,
            photoId,
        },
        {
            id: '',
            userId: 'fakeId',
            photoId,
        },
    ];
    const mockAddLike = async (userId: string, photoId: string) => mockLike;
    const mockGetLikesByUserId = async (userId: string) => mockLikes;
    const mockGetLikeByPhotoId = async (photoId: string) => mockLikes;

    beforeAll(() => {
        store = new DataStore('./store');
        collection = store.collection<Like>('');
        likeRepository = new LikeRepository(collection);
    });
    beforeEach(() => {
        dbService = new DbService();
        jest.spyOn(dbService, 'getLikeRepository').mockImplementation(
            () => likeRepository,
        );
        likeService = new LikeService(dbService);
    });

    it(`Should add like`, async () => {
        likeRepository.addLike = mockAddLike;
        const like = await likeService.addLike(userId, photoId);
        expect(like).toEqual(mockLike);
    });

    it(`Should get user's likes`, async () => {
        likeRepository.getLikesByUserId = mockGetLikesByUserId;
        const likes = await likeService.getLikesByUserId(userId);
        expect(likes).toEqual(mockLikes);
    });

    it(`Should get a like by photo's id`, async () => {
        likeRepository.getLikeByPhotoId = mockGetLikeByPhotoId;
        const likes = await likeService.getLikeByPhotoId(userId, photoId);
        expect(likes).toEqual(mockLikes[0]);
    });
});
