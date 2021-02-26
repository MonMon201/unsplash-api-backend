import { User } from '../../../db/models/user.type';

export class AuthDto implements User {
    id!: string;
    username!: string;

    static from(user: User) {
        const dto = new AuthDto();
        dto.id = user.id;
        dto.username = user.username;
        return dto;
    }
}
