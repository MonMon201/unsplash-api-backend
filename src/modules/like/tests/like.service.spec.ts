import { Collection, DataStore } from 'notarealdb';
import { DbService } from '../../../db/db.service';
import { Like } from '../../../db/models/like.entity';
import { LikeRepository } from '../../../db/repositories/like.repository';
import { LikeService } from '../like.service';

describe('Like Service', () => {
    const userId = 'id';
    const photoId = 'id';
    let store: DataStore;
    let collection: Collection<Like>;
    let likeRepository: LikeRepository;
    let dbService: DbService;
    let likeService: LikeService;

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
        const userId = 'id';
        const mockLike: Like = {
            id: '',
            userId: '',
            photoId: '',
        };
        likeRepository.addLike = async (userId: string, photoId: string) =>
            mockLike;
        const like = await likeService.addLike(userId, photoId);
        expect(like).toEqual(mockLike);
    });

    it(`Should get user's likes`, async () => {
        const mockLike: Like[] = [
            {
                id: '',
                userId: '',
                photoId: '',
            },
        ];
        likeRepository.getLikesByUserId = async (userId: string) => mockLike;
        const likes = await likeService.getLikesByUserId(userId);
        expect(likes).toEqual(mockLike);
    });

    it(`Should get a like by photo's id`, async () => {
        const userId = 'userId';
        const photoId = 'photoId';
        const mockLike: Like[] = [
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
        likeRepository.getLikeByPhotoId = async (photoId: string) => mockLike;
        const likes = await likeService.getLikeByPhotoId(userId, photoId);
        expect(likes).toEqual(mockLike[0]);
    });
});
