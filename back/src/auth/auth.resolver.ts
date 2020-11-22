import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CurrentUser } from './auth.decorator';
import { GqlAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../users/dto/InputLogin.dto';
import { UserRegDto } from '../users/dto/InputReq.dto';
import { User } from '../entities/users.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('login')
  async login(@Args('data') data: UserLoginDto): Promise<string> {
    return this.authService.login(data);
  }

  @Mutation('registration')
  async registration(@Args('data') data: UserRegDto): Promise<User> {
    return this.authService.register(data);
  }

  @Query('my')
  @UseGuards(GqlAuthGuard)
  async my(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
