import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './users.repository';
import { User } from '../entities/users.entity';
import { UserRegDto } from './dto/InputReq.dto';
import { UserLoginDto } from './dto/InputLogin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async login(data: UserLoginDto): Promise<User> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new ForbiddenException('wrong email or password');

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) throw new ForbiddenException('wrong email or password');

    return user;
  }

  async register(data: UserRegDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);

    const hashPass = await bcrypt.hash(data.password, salt);

    data.password = hashPass;

    const result = await this.userRepository.createUser(data);
    return result;
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
