import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRegDto {
  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
