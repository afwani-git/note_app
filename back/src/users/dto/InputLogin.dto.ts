import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
