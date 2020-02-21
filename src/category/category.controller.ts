import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() categoryDTO: CreateCategoryDTO) {
    let category: Category;

    if (categoryDTO.parent_id) {
      const parentCategory = await this.categoryRepository.findOne({
        id: categoryDTO.parent_id,
      });
      category = new Category(categoryDTO.name, parentCategory);
    } else {
      category = new Category(categoryDTO.name);
    }

    this.categoryRepository.insert(category);
  }
}
