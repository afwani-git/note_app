import { ForbiddenException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IJwtPayload } from './interface/jwtPayload.interface';
import { UserRepository } from '../users/users.repository';
import { User } from '../entities/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hello-world',
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { id, email } = payload;

    const user = await this.userRepo.findOne({ where: { id, email } });

    if (!user) throw new ForbiddenException('invalid token!!');

    return user;
  }
}
