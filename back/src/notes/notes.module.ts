import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { NotesRepository } from './notes.repository';
import { CategoryRepository } from './category.repository';
import { UserRepository } from '../users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotesRepository,
      CategoryRepository,
      UserRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [NotesService, NotesResolver],
})
export class NotesModule {}
