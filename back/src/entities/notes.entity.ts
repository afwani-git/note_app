import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './users.entity';
import { Category } from './category.entity';

@ObjectType()
@Entity('notes')
export class Notes {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 200 })
  body: string;

  @Field(() => User)
  @ManyToOne(() => User, { cascade: true })
  user: User;

  @Field(() => Category)
  @ManyToOne(() => Category)
  category: Category;
}
