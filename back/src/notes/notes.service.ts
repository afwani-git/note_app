import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesInputDto } from './dto/NotesInput.dto';
import { UserRepository } from '../users/users.repository';
import { NotesRepository } from './notes.repository';
import { CategoryRepository } from './category.repository';
import { Category } from '../entities/category.entity';
import { Notes } from '../entities/notes.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository)
    private notesRepository: NotesRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){}
  
  async getNotes(user_id: string,id?: string): Promise<Notes[]>{
    return this.notesRepository.fetchNotes(user_id,id);
  }

  async getCategory(user_id: string): Promise<Category[]>{
    return this.categoryRepository
            .find({
              where: { user: user_id },
              relations: ['notes']
            })
  }
  
  async createNotes(user_id: string, data: NotesInputDto): Promise<Notes>{

    const notes = this.notesRepository.create(data);
    const user = await this.userRepository.findOne({ where: { id: user_id } });
  
    if(!user) throw new UnauthorizedException('you not login!');

    notes.user = user;
    
    const result = await this.notesRepository.save(notes);

    return result;
  }

  async deleteNotes(user_id: string,notes_id: string):Promise<boolean> {
    const notes = await this.notesRepository.findOne({ where: { id: notes_id, user: user_id } });
    
    if(!notes) throw new BadRequestException();

    await  this.notesRepository.remove(notes);
    return true;
  }

  async updateNotes(user_id: string, data: NotesInputDto): Promise<Notes>{
    const note = await this.notesRepository.findOne({ where: { user: user_id } });
    
    Object.assign(note,{
      ...data
    });
  
    const result = await this.notesRepository.save(note);

    return result;
  }
  
  async createCategory(name: string, user_id: string): Promise<Category>{
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const category = this.categoryRepository.create({ name , user });

    return this.categoryRepository.save(category);
  }
  
  async addCategory(category_id: string, notes_id: string, user_id: string): Promise<Notes>{
    
    const notes = await this.notesRepository.findOne({ where: { id: notes_id, user: user_id } });
    const category = await this.categoryRepository.findOne({ where: { id: category_id, user: user_id }});
  
    if(!notes) throw new NotFoundException('notes not found');
    if(!category) throw new NotFoundException('category not found');

    Object.assign(notes,{
      category: category
    })
  
    const result  =  await this.notesRepository.save(notes);

    return result; 

  }
}
