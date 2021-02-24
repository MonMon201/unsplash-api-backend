import { User } from '../../../db/models/user.type';

export class UserDTO implements User {
    id!: string;
    username!: string;

    static from(user: User) {
        const dto = new UserDTO();
        dto.id = user.id;
        dto.username = user.username;
        return dto;
    }
}
