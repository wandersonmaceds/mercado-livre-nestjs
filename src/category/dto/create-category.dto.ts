import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { UniqueCategoryNameConstraint } from '../validator/unique-category-name.constraint';
import { ParentCategoryExistsConstraint } from '../validator/parent-category-exists.constraint';
import { Category } from '../category.entity';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @Validate(UniqueCategoryNameConstraint, {
    message: 'Category name already exists',
  })
  name: string;

  @IsOptional()
  @Validate(ParentCategoryExistsConstraint, {
    message: `Parent category doesn't exists`,
  })
  parent: Category;
}
