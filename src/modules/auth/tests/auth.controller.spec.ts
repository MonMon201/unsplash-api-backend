import { User } from "../../../db/models/user.entity";
import { DbService } from "../../../db/db.service";
import { UserService } from "../../user/user.service";
import { AuthService } from "../auth.service"
import { AuthController } from "../auth.controller";
import { AuthDto } from "../dtos/auth.dto";

describe('Auth controller', () => {
    let dbService: DbService;
    let authService: AuthService;
    let userService: UserService;
    let authController: AuthController;
    beforeEach(() => {
        dbService = new DbService();
        userService = new UserService(dbService)
        authService = new AuthService(userService);
        authController = new AuthController(authService, userService);
    })
    describe('login', () => {
        it('should login users', async () => {
            const mockInput: AuthDto = {
                id: '',
                username: 'User',
            }
            const mockResponse: User = {
                id: 'identifier',
                username: 'User',
            }
            const mockGetUserByUsername = async (username): Promise<User> => mockResponse
            jest.spyOn(userService, 'getUserByUsername').mockImplementation(mockGetUserByUsername)
            const response = await authController.login(mockInput)
            expect(response).toEqual(mockResponse);
        })
    
        it('should not login users as guest', async () => {
            const mockInput: AuthDto = {
                id: '',
                username: 'Guest',
            }
            try {
                await authController.login(mockInput)
            } catch (e) {
                expect(e.response).toEqual(`Can't login as Guest`);
            }
        })
    
        it('should not login users with unexisting names', async () => {
            const mockInput: AuthDto = {
                id: 'identifier',
                username: 'User',
            }
            const errorText = `${mockInput.username} doesn't exists.`
            const mockGetUserByUsername = async (username) => undefined
            jest.spyOn(userService, 'getUserByUsername').mockImplementation(mockGetUserByUsername)
            try {
                await authController.login(mockInput)
            } catch (e) {
                expect(e.response).toEqual(errorText);
            }
        })
    })

    describe('register', () => {
        it('should register users', async () => {
            const mockInput: AuthDto = {
                id: '',
                username: 'User',
            }
            const mockResponse: User = {
                id: 'identifier',
                username: 'User',
            }
            const mockGetUserByUsername = async (username): Promise<User> => undefined 
            const mockAddUser = async (username): Promise<User> => mockResponse 
            jest.spyOn(userService, 'getUserByUsername').mockImplementation(mockGetUserByUsername)
            jest.spyOn(userService, 'addUser').mockImplementation(mockAddUser)
            const response = await authController.register(mockInput)
            expect(response).toEqual(mockResponse);
        })
    
        it('should not register users as guest', async () => {
            const mockInput: AuthDto = {
                id: '',
                username: 'Guest',
            }
            try {
                await authController.register(mockInput)
            } catch (e) {
                expect(e.response).toEqual(`Can't register as Guest`);
            }
        })
    
        it('should not register users with existing names', async () => {
            const mockInput: AuthDto = {
                id: 'identifier',
                username: 'User',
            }
            const errorText = `Username ${mockInput.username} is already in use.`
            const mockGetUserByUsername = async (username) => mockInput
            jest.spyOn(userService, 'getUserByUsername').mockImplementation(mockGetUserByUsername)
            try {
                await authController.register(mockInput)
            } catch (e) {
                expect(e.response).toEqual(errorText);
            }
        })
    })
})