import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CurrentUser } from '../auth/auth.decorator';
import { GqlAuthGuard } from '../auth/auth.guard';
import { NotesInputDto } from './dto/NotesInput.dto';
import { NotesService } from './notes.service';
import { Notes } from '../entities/notes.entity';
import { Category } from '../entities/category.entity';
import { User } from '../entities/users.entity';

@UseGuards(new GqlAuthGuard())
export class NotesResolver {
  constructor(private notesService: NotesService) {}

  @Query('notes')
  async getAllNotes(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Notes[]> {
    const user_id = user.id;
    return this.notesService.getNotes(user_id, id);
  }

  @ResolveField('notes')
  @Resolver('User')
  async userChildren(
    @Args('id') id: string,
    @Parent() user: User
  ): Promise<Notes[]> {
    const user_id = user.id;
    return this.notesService.getNotes(user_id, id);
  }

  @ResolveField('notes')
  @Resolver('Category')
  async categoryChildren(
    @Args('id') id: string,
    @CurrentUser() user: User,
    @Parent() category: Category
  ): Promise<Notes[]> {
    const user_id = user.id;
    return this.notesService.getNotes(user_id, id);
  }

  @Query('category')
  async fetchCategory(
    @CurrentUser() user: User
  ): Promise<Category[]>
  {
    const user_id = user.id;
    return this.notesService.getCategory(user_id);
  }

  @Mutation('createNotes')
  async createNotes(
    @CurrentUser() user: User,
    @Args('data') data: NotesInputDto,
  ): Promise<Notes> {
    const user_id = user.id;
    return this.notesService.createNotes(user_id, data);
  }

  @Mutation('updateNotes')
  async updateNotes(
    @CurrentUser() user: User,
    @Args('data') data: NotesInputDto,
  ): Promise<Notes> {
    const user_id = user.id;
    return this.notesService.updateNotes(user_id, data);
  }

  @Mutation('deleteNotes')
  async deleteNotes(
    @CurrentUser() user: User,
    @Args('notes_id') notes_id: string,
  ): Promise<boolean> {
    const user_id = user.id;
    return this.notesService.deleteNotes(user_id, notes_id);
  }

  @Mutation('createCategory')
  async createCategory(
    @CurrentUser() user: User,
    @Args('name') name: string,
  ): Promise<Category> {
    const user_id = user.id;
    return this.notesService.createCategory(name, user_id);
  }

  @Mutation('addCategory')
  async addCategory(
    @Args('notes_id') notes_id: string,
    @Args('category_id') category_id: string,
    @CurrentUser() user: User,
  ): Promise<Notes> {
    const user_id = user.id;
    return this.notesService.addCategory(category_id, notes_id, user_id);
  }

}
