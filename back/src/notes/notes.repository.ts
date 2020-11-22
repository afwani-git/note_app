import { EntityRepository, Repository } from 'typeorm';
import { Notes } from '../entities/notes.entity';

@EntityRepository(Notes)
export class NotesRepository extends Repository<Notes> {
  async fetchNotes(user_id: string, id?: string): Promise<Notes[]> {
    const query = this.createQueryBuilder('notes');

    query.where('notes.user=:user_id', { user_id });

    if (id) {
      query.where('notes.id=:id', { id });
    }
    
    query.leftJoinAndSelect("notes.category","category");

    const result = await query.getMany();

    return result;
  }
}
