import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getCategory(notes_id?: string): Promise<Category> {
    const result = await this.findOne({ where: { notes: notes_id }, relations: ['notes']  });
    return result;
  }
}
