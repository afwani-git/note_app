import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../auth/interface/jwtPayload.interface';
import { UserLoginDto } from '../users/dto/InputLogin.dto';
import { UserRegDto } from '../users/dto/InputReq.dto';
import { UsersService } from '../users/users.service';
import { User } from '../entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(data: UserLoginDto): Promise<string> {
    const user = await this.userService.login(data);

    const payload: IJwtPayload = {
      email: user.email,
      id: user.id,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async register(data: UserRegDto): Promise<User> {
    return this.userService.register(data);
  }

  async getProfile(id: number): Promise<User> {
    return this.userService.getUser(id);
  }
}
