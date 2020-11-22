import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { JwtStrategy } from './auth.startegy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'hello-world',
      signOptions: {
        expiresIn: '3d',
      },
    }),
    PassportModule.register({ defaultStartegy: 'jwt' }),
  ],
  providers: [AuthService, UsersService, AuthResolver, JwtStrategy],
  exports: [TypeOrmModule, PassportModule],
})
export class AuthModule {}
