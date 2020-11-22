import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Notes } from './notes.entity';
import { Category } from './category.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 200 })
  fullname: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Field(() => [Notes])
  @OneToMany(() => Notes, (notes) => notes.user)
  notes: Notes[];

  @OneToMany(() => Category, (category) => category.user)
  categoryNotes: Category[];
}
