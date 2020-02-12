import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getRepository } from "typeorm";
import { Category } from "../category.entity";

@ValidatorConstraint({ name: "category-exists", async: true })
export class ParentCategoryExistsConstraint implements ValidatorConstraintInterface{

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {

        const repository = getRepository(Category);
        const category = await repository.findOne({id: value});
        return category !== undefined;
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "value doesn't exists";
    }
}