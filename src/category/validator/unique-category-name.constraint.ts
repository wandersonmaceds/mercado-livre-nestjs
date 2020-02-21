import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getRepository } from "typeorm";
import { Category } from "../category.entity";

@ValidatorConstraint({ name: "unique-name", async: true })
export class UniqueCategoryNameConstraint implements ValidatorConstraintInterface{

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {

        const repository = getRepository(Category);
        const category = await repository.findOne({ name: value });
        return category === undefined;
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "value already exists";
    }
}