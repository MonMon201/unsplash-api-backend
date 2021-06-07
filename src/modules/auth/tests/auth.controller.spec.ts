import { User } from '../../../db/models/user.entity';
import { DbService } from '../../../db/db.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { AuthDto } from '../dtos/auth.dto';

describe('Auth controller', () => {
    let dbService: DbService;
    let authService: AuthService;
    let userService: UserService;
    let authController: AuthController;
    const mockInputUser: AuthDto = {
        id: '',
        username: 'User',
    };
    const mockInputGuest: AuthDto = {
        id: '',
        username: 'Guest',
    };
    const mockResponseUser: User = {
        id: 'identifier',
        username: 'User',
    };
    const errorTextDoesntExist = `${mockInputUser.username} doesn't exists.`;
    const errorTextAlreadyInUse = `Username ${mockInputUser.username} is already in use.`;
    const mockGetUserByUsername = async (username): Promise<User> => mockResponseUser;
    const mockGetUserByUsernameEmpty = async (username) => undefined;
    beforeEach(() => {
        dbService = new DbService();
        userService = new UserService(dbService);
        authService = new AuthService(userService);
        authController = new AuthController(authService, userService);
    });
    describe('login endpoint', () => {
        it('should login users', async () => {
            jest.spyOn(userService, 'getUserByUsername').mockImplementation(
                mockGetUserByUsername,
            );
            const response = await authController.login(mockInputUser);
            expect(response).toEqual(mockResponseUser);
        });

        it('should not login users as guest', async () => {
            try {
                await authController.login(mockInputGuest);
            } catch (e) {
                expect(e.response).toEqual(`Can't login as Guest`);
            }
        });

        it('should not login users with unexisting names', async () => {
            jest.spyOn(userService, 'getUserByUsername').mockImplementation(
                mockGetUserByUsernameEmpty,
            );
            try {
                await authController.login(mockInputUser);
            } catch (e) {
                expect(e.response).toEqual(errorTextDoesntExist);
            }
        });
    });

    describe('register endpoint', () => {
        it('should register users', async () => {
            const mockGetUserByUsername = async (username): Promise<User> =>
                undefined;
            const mockAddUser = async (username): Promise<User> => mockResponseUser;
            jest.spyOn(userService, 'getUserByUsername').mockImplementation(
                mockGetUserByUsername,
            );
            jest.spyOn(userService, 'addUser').mockImplementation(mockAddUser);
            const response = await authController.register(mockInputUser);
            expect(response).toEqual(mockResponseUser);
        });

        it('should not register users as guest', async () => {
            try {
                await authController.register(mockInputGuest);
            } catch (e) {
                expect(e.response).toEqual(`Can't register as Guest`);
            }
        });

        it('should not register users with existing names', async () => {
            jest.spyOn(userService, 'getUserByUsername').mockImplementation(
                mockGetUserByUsername,
            );
            try {
                await authController.register(mockInputUser);
            } catch (e) {
                expect(e.response).toEqual(errorTextAlreadyInUse);
            }
        });
    });
});
