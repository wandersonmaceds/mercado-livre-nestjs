import { IsNotEmpty, IsNumber, IsOptional, Validate } from "class-validator";
import { UniqueCategoryNameConstraint } from "../validator/unique-category-name.constraint";
import { ParentCategoryExistsConstraint } from "../validator/parent-category-exists.constraint";


export class CreateCategoryDTO {

    @IsNotEmpty()
    @Validate(UniqueCategoryNameConstraint, { message: 'Category name already exists'})
    name: string;

    @IsOptional()
    @IsNumber()
    @Validate(ParentCategoryExistsConstraint, { message: `Parent category doesn't exists` })
    parentId: number;
}