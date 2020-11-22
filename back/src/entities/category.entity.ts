import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Notes } from './notes.entity';
import { User } from './users.entity';

@ObjectType()
@Entity('categories')
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Notes, (notes) => notes.category)
  notes: Notes[];

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
}
