import {
  IsNotEmpty,
  IsOptional,
  Validate,
  IsNumber,
  validate,
} from 'class-validator';
import { ParentCategoryExistsConstraint } from '../validator/parent-category-exists.constraint';
import { UniqueCategoryNameConstraint } from '../validator/unique-category-name.constraint';
import { Category } from '../category.entity';
import { getRepository } from 'typeorm';

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
}
