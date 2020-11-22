import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UserRegDto } from './dto/InputReq.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(data: UserRegDto): Promise<User> {
    const userObj = this.create(data);

    const result = await this.save(userObj);

    return result;
  }
}
