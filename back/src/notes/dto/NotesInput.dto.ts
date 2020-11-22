import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NotesInputDto {
  @Field()
  title: string;

  @Field()
  body: string;
}
