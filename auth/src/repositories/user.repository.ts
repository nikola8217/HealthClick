import { User } from '../models/user.model';
import { CreateUser } from '../interfaces/user.interface';

export class UserRepository {
    static async createUser(user: CreateUser) {
        return User.create(user);
    }

    static async findByEmail(email: string) {
        return User.findOne({ email });
    }
}