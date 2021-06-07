import { User } from '../../../db/models/user.entity';
import { DbService } from '../../../db/db.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

describe('Auth service', () => {
    let dbService: DbService;
    let authService: AuthService;
    let userService: UserService;
    const mockResponse: User = {
        id: 'identifier',
        username: 'Guest',
    };
    const mockGetUserByUsername = async (username): Promise<User> =>
        mockResponse;
    beforeEach(() => {
        dbService = new DbService();
        userService = new UserService(dbService);
        authService = new AuthService(userService);
    });
    it('should login guests', async () => {
        jest.spyOn(userService, 'getUserByUsername').mockImplementation(
            mockGetUserByUsername,
        );
        const response = await authService.guest();
        expect(response).toEqual(mockResponse);
    });
});
