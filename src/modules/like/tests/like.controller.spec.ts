import { DbService } from "../../../db/db.service";
import { Like } from "../../../db/models/like.entity";
import { LikeDto } from "../dtos/like.dto";
import { LikeRequest } from "../dtos/like.request";
import { LikeController } from "../like.controller";
import { LikeService } from "../like.service";

describe('Like Controller', () => {
    let dbService: DbService;
    let likeService: LikeService;
    let likeController: LikeController;
    const userId = 'mockedid';
    const photoId = 'mockedid';
    const id = 'mockedid';
  
    beforeAll(() => {
        dbService = new DbService();
        likeService = new LikeService(dbService);
        likeController = new LikeController(likeService);
    });

    it(`Should add a like`, async () => {
        const mockLikeReq: LikeRequest = {
            userId,
            photoId,
        }
        const mockedResponse: Like = {
            id,
            userId,
            photoId
        }
        const mockedDto: LikeDto = {
            id,
            userId,
            photoId
        }
        const mockedGetLikeByPhotoId = async (userId: string, photoId: string) => undefined;
        jest.spyOn(likeService, "getLikeByPhotoId").mockImplementation(mockedGetLikeByPhotoId);
        const mockedAddLike = async (userId: string, photoId: string) => mockedResponse;
        jest.spyOn(likeService, "addLike").mockImplementation(mockedAddLike);
        const like = await likeController.addLike(mockLikeReq)
        expect(like).toEqual(mockedDto)
    });

    it(`Should throw a "Forbidden" error if try to add existing like`, async () => {
        const mockLikeReq: LikeRequest = {
            userId,
            photoId,
        }
        const mockedResponse: Like = {
            id,
            userId,
            photoId
        }
        const mockedGetLikeByPhotoId = async (userId: string, photoId: string) => mockedResponse;
        jest.spyOn(likeService, "getLikeByPhotoId").mockImplementation(mockedGetLikeByPhotoId);
        try {
            await likeController.addLike(mockLikeReq)
        } catch (e) {
            expect(e.response).toEqual(`Like is already on this photo`);
        }
    });

    it(`Should remove a like`, async () => {
        const mockLikeReq: LikeRequest = {
            userId,
            photoId,
        }
        const mockedResponse: Like = {
            id,
            userId,
            photoId
        }
        const mockedDto: LikeDto = {
            id,
            userId,
            photoId
        }
        const mockedGetLikeByPhotoId = async (userId: string, photoId: string) => mockedResponse;
        jest.spyOn(likeService, "getLikeByPhotoId").mockImplementation(mockedGetLikeByPhotoId);
        const mockedRemoveLike = async (likeId: string) => {};
        jest.spyOn(likeService, "removeLike").mockImplementation(mockedRemoveLike);
        const like = await likeController.removeLike(mockLikeReq)
        expect(like).toEqual(mockedDto)
    });

    it(`Should throw a "Forbidden" error if try to remove unexisting like`, async () => {
        const mockLikeReq: LikeRequest = {
            userId,
            photoId,
        }
        const mockedDto: LikeDto = {
            id,
            userId,
            photoId
        }
        const mockedGetLikeByPhotoId = async (userId: string, photoId: string) => undefined;
        jest.spyOn(likeService, "getLikeByPhotoId").mockImplementation(mockedGetLikeByPhotoId);
        try {
            await likeController.removeLike(mockLikeReq)
        } catch (e) {
            expect(e.response).toEqual(`No like on this photo`);
        }
    });
});
