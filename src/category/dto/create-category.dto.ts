import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Category } from '../category.entity';
import { ParentCategoryExistsConstraint } from '../validator/parent-category-exists.constraint';
import { UniqueCategoryNameConstraint } from '../validator/unique-category-name.constraint';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @Validate(UniqueCategoryNameConstraint, {
    message: 'Category name already exists',
  })
  name: string;

  @IsOptional()
  @IsNumber()
  @Validate(ParentCategoryExistsConstraint, {
    message: `Parent category doesn't exists`,
  })
  parent_id: number;

  async toModel(repository: Repository<Category>) {
    if (this.parent_id) {
      const parentCategory = await repository.findOne(this.parent_id);
      return new Category(this.name, parentCategory);
    }
    return new Category(this.name);
  }
}
