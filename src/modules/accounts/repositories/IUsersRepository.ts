import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
