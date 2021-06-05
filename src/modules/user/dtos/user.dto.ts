import { User } from '../../../db/models/user.entity';

export class userDto implements User {
    id!: string;
    username!: string;

    static from(user: User) {
        const dto = new userDto();
        dto.id = user.id;
        dto.username = user.username;
        return dto;
    }
}
